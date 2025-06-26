import React from "react";

const DetailsBottomInfo = ({sku,category}) => {
  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{sku}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{category}</p>
        </div>
        
      </div>


      {/* product-details-msg */}

      <div className="tp-product-details-msg mb-15">
        <ul>
          <li>7 days easy returns</li>
        </ul>
      </div>
      
    </>
  );
};

export default DetailsBottomInfo;
