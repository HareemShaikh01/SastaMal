import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { useGetRelatedProductsQuery } from "@/redux/features/productApi";
import ProductItem from "../products/beauty/product-item";
import ErrorMsg from "../common/error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";
import useWindowSize from "@/hooks/use-window-size"; // optional custom hook
import ProductItem1 from "../products/beauty/product-item1";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 24,
  navigation: {
    nextEl: ".tp-related-slider-button-next",
    prevEl: ".tp-related-slider-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const RelatedProducts = ({ id }) => {
  const { width } = useWindowSize(); // You may use another method if no hook
  const { data: products, isError, isLoading } = useGetRelatedProductsQuery(id);

  let content = null;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else if (products?.data?.length > 0) {
    const product_items = products.data.slice(0, 6); // max 6 items

    // Show grid layout for small screens
    if (width < 768) {
      content = (
        <div className="row">
          {product_items.map((item) => (
            <div className="col-6 mb-4" key={item._id}>
              <ProductItem1 product={item} primary_style={true} />
            </div>
          ))}
        </div>
      );
    } else {
      // Use Swiper for larger screens
      content = (
        <Swiper
          {...slider_setting}
          modules={[Autoplay, Navigation]}
          className="tp-product-related-slider-active swiper-container mb-10"
        >
          {product_items.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductItem product={item} primary_style={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
  }

  return <div className="tp-product-related-slider">{content}</div>;
};

export default RelatedProducts;
