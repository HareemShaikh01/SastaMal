// external
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
// internal
import shape_1 from "@assets/img/slider/shape/slider-shape-1.png";
import shape_2 from "@assets/img/slider/shape/slider-shape-2.png";
import shape_3 from "@assets/img/slider/shape/slider-shape-3.png";
import shape_4 from "@assets/img/slider/shape/slider-shape-4.png";
import { ArrowRightLong, SliderNextBtn, SliderPrevBtn, TextShape } from "@/svg";


function Shape({ img, num }) {
  return (
    <Image className={`tp-slider-shape-${num}`} src={img} alt="slider-shape" priority />
  );
}

const HomeHeroSlider = () => {
  const [active, setActive] = useState(false);
  const [sliderData, setSliderData] = useState([]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/fetchBanners`);
        if (!response.ok) {
          throw new Error('Error fetching banners: ' + response.statusText);
        }
        const data = await response.json();
        setSliderData(data.data); // Set the banners data to the state
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchBanners();
  }, []);


  // handleActiveIndex
  const handleActiveIndex = (index) => {
    if (index === 2) {
      setActive(true)
    }
    else {
      setActive(false)
    }
  }
  return (
    <>
      <section className="tp-slider-area p-relative z-index-1">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          effect="fade"
          navigation={{
            nextEl: ".tp-slider-button-next",
            prevEl: ".tp-slider-button-prev",
          }}
          onSlideChange={(swiper) => handleActiveIndex(swiper.activeIndex)}
          pagination={{ el: ".tp-slider-dot", clickable: true }}
          modules={[Navigation, Pagination, EffectFade]}
          className={`tp-slider-active tp-slider-variation swiper-container ${active ? "is-light" : ""
            }`}
        >
          {sliderData.map((item) => (
            <SwiperSlide
              key={item.id}
              className={`tp-slider-item tp-slider-height d-flex align-items-center ${item?.green_bg
                ? "green-dark-bg"
                : item?.is_light
                  ? "is-light"
                  : ""
                }`}
              style={{ backgroundColor: item.is_light && "#E3EDF6" }}
            >
              <div className="tp-slider-shape">
                <Shape img={shape_1} num="1" />
                <Shape img={shape_2} num="2" />
                <Shape img={shape_3} num="3" />
                <Shape img={shape_4} num="4" />
              </div>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-5 col-lg-6 col-md-6">
                    <div className="tp-slider-content p-relative z-index-1">
                      <span>
                        {item.pre_title.text} <b>Rs.{item.pre_title.price}</b>
                      </span>
                      <h3 className="tp-slider-title">{item.title}</h3>
                      <p>
                        {item.subtitle.text_1}
                        <span>
                          -{item.subtitle.percent}%
                          <TextShape />
                        </span>{" "}
                        {item.subtitle.text_2}
                      </p>

                      {item.btn_link && <div className="tp-slider-btn">
                        <Link href={item.btn_link} className="tp-btn tp-btn-2 tp-btn-white">
                          Shop Now
                          {" "} <ArrowRightLong />
                        </Link>
                      </div>}
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-6 col-md-6">
                    <div className="tp-slider-thumb text-end">

                      <Image 
                      src={item.img} 
                      alt="slider-img" 
                      height={500}
                      width={500}
                      style={{ objectFit: 'contain'}} 

                      />

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="tp-slider-arrow tp-swiper-arrow">
            <button type="button" className="tp-slider-button-prev">
              <SliderPrevBtn />
            </button>
            <button type="button" className="tp-slider-button-next">
              <SliderNextBtn />
            </button>
          </div>
          <div className="tp-slider-dot tp-swiper-dot"></div>
        </Swiper>
      </section>
    </>
  );
};

export default HomeHeroSlider;
