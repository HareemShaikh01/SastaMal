import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const ProductDetailsArea = ({ productItem }) => {
  const { _id, img, imageURL, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(img);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveImg(img);
  }, [img]);

  const handleImageActive = (item) => {
    setActiveImg(item);
  };

  return (
    <section className="tp-product-details-area">
      {/* Product Top Section */}
      <div className="tp-product-details-top pb-115">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                activeImg={activeImg}
                handleImageActive={handleImageActive}
                imageURL={imageURL}
                imgWidth={600}
                imgHeight={700}
                videoId={videoId}
                status={status}
              />
            </div>
            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productItem={productItem}
                handleImageActive={handleImageActive}
                activeImg={activeImg}
                detailsBottom={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Tabs */}
      {/* <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav product={productItem} />
            </div>
          </div>
        </div>
      </div> */}

      {/* Related Products Section */}
      <section className="tp-related-product">
        <div className="container">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center">
              <span className="tp-section-title-pre-6">Next day Products</span>
              <h3 className="tp-section-title-6">Related Products</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RelatedProducts id={_id} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetailsArea;
