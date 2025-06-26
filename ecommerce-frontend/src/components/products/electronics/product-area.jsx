import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import ProductItem1 from "../beauty/product-item1";

// const tabs = ["new", "featured", "topSellers"];
const tabs = ["trending", "active", "featured"];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [isMobile, setIsMobile] = useState(false);

  const { data: products, isError, isLoading, refetch } =
    useGetProductTypeQuery({ type: 'fashion', query: `${activeTab}=true` });

  // handleActiveTab
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  // detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // screens ≤768px are mobile
    };

    handleResize(); // check on mount
    window.addEventListener('resize', handleResize); // check on resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // refetch when active value change
  useEffect(() => {
    refetch()
  }, [activeTab, refetch])

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;

    content = product_items.map((prd, i) => (
      <div key={i} className="col-6 col-sm-6 col-lg-3 col-xl-3">
        {isMobile ? (
          <ProductItem1 product={prd} />
        ) : (
          <ProductItem product={prd} />
        )}
      </div>
    ));
  }

  return (
    <section className="tp-product-area pb-55 mt-3">
      <div className="container mt-3">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-7">
            <div className="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
              <ul className="nav nav-tabs justify-content-sm-end">
                {tabs.map((tab, i) => (
                  <li key={i} className="nav-item">
                    <button
                      onClick={() => handleActiveTab(tab)}
                      className={`nav-link text-capitalize ${activeTab === tab ? "active" : ""}`}
                      style={{
                        color: activeTab === tab ? "#ff6f61" : "#000", // active color vs default color
                      }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <span className="tp-product-tab-line">
                          <TabLine />
                        </span>
                      )}
                    </button>
                  </li>
                ))}

              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ProductArea;
