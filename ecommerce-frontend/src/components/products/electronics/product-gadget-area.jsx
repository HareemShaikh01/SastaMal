import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper';
import Link from 'next/link';
import { ArrowRight } from '@/svg';
import ProductItem from './product-item';
import PrdCategoryList from './prd-category-list';
import ErrorMsg from '@/components/common/error-msg';
import b_bg_1 from '@assets/img/product/gadget/gadget-banner-1.jpg';
import b_bg_2 from '@assets/img/product/gadget/gadget-banner-2.jpg';
import { useGetProductTypeQuery } from '@/redux/features/productApi';
import gadget_girl from '@assets/img/product/gadget/gadget-girl.png';
import HomeGadgetPrdLoader from '@/components/loader/home/home-gadget-prd-loader';
import ProductItem1 from '../beauty/product-item1';

const ProductGadgetArea = () => {
  const { data: products, isError, isLoading } = useGetProductTypeQuery({ type: 'fashion' });

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Mobile if width <= 767px
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <HomeGadgetPrdLoader loading={isLoading} />
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    if (isMobile) {
      // Mobile: show first 6 products, displayed 2 in a row
      const mobile_products = products.data.slice(0, 6);
      content = mobile_products.map((prd, i) => (
        <div key={i} className="col-6">
          <ProductItem1 product={prd} />
        </div>
      ));
    } else {
      // Desktop: show 6 products in 3 per row
      const desktop_products = products.data.slice(0, 6);
      content = desktop_products.map((prd, i) => (
        <div key={i} className="col-xl-4 col-sm-6">
          <ProductItem product={prd} />
        </div>
      ));
    }
  }


  // gadget banner 
  function GadgetBanner() {

    const settings = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".tp-product-gadget-banner-slider-dot",
        clickable: true,
      },
    }

    const banner_data = [
      { bg: b_bg_1, title: <>Selected novelty <br /> Products</>, price: 4000 },
      { bg: b_bg_2, title: <>Top Rated <br /> Products</>, price: 5000 },
    ]
    return (
      <Swiper {...settings} effect='fade' modules={[Pagination, EffectFade]} className="tp-product-gadget-banner-slider-active swiper-container">
        {banner_data.map((b, i) => (
          <SwiperSlide key={i} className="tp-product-gadget-banner-item include-bg"
            style={{ backgroundImage: `url(${b.bg.src})` }}>
            <div className="tp-product-gadget-banner-content">
              <span className="tp-product-gadget-banner-price">Only Rs.{b.price.toFixed(0)}</span>
              <h3 className="tp-product-gadget-banner-title">
                <Link href="/shop">{b.title}</Link>
              </h3>
            </div>
          </SwiperSlide>
        ))}
        <div className="tp-product-gadget-banner-slider-dot tp-swiper-dot"></div>
      </Swiper>
    )
  }

  return (
    <>
      <section className="tp-product-gadget-area pt-80 pb-75">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5">
              <div className="tp-product-gadget-sidebar mb-40">
                <div className="tp-product-gadget-categories p-relative fix mb-10">
                  <div className="tp-product-gadget-thumb">
                    <Image src={gadget_girl} alt="gadget_girl img" priority />
                  </div>
                  <h3 className="tp-product-gadget-categories-title">Fashion <br /> Gadgets</h3>

                  <div className="tp-product-gadget-categories-list">
                    <PrdCategoryList />
                  </div>

                  <div className="tp-product-gadget-btn">
                    <Link href="/shop" className="tp-link-btn">More Products
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
                <div className="tp-product-gadget-banner">
                  <GadgetBanner />
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="tp-product-gadget-wrapper">
                <div className="row">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGadgetArea;
