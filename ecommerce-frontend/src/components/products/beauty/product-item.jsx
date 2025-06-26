import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

// Random rating generator (between 3 and 5 stars)
const getRandomRating = () => (Math.random() * (5 - 3) + 3).toFixed(1);

// Random reviews count (between 5 and 50)
const getRandomReviewsCount = () => Math.floor(Math.random() * (50 - 5) + 5);

const ProductItem = ({ product, prdCenter = false, primary_style = false }) => {
  const { _id, img, title, discount, price, tags, status, previousPrice } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  // Randomly generate rating and reviews count (once per render)
  const rating = getRandomRating();
  const reviewsCount = getRandomReviewsCount();

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <div
      className={`tp-product-item-3 mb-50 ${primary_style ? "tp-product-style-primary" : ""} ${prdCenter ? "text-center" : ""}`}
      style={{ height: "580px" }} // Slightly increased height to fit rating & reviews
    >
      <div className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product image" width={282} height={320} style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }} />
        </Link>

        <div className="tp-product-badge">
          {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
        </div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn text-center`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-3 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                disabled={status === 'out-of-stock'}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>

            <button disabled={status === 'out-of-stock'} onClick={() => handleWishlistProduct(product)} className={`tp-product-action-btn-3 
            ${isAddedToWishlist ? 'active' : ''} tp-product-add-to-wishlist-btn`}>
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>

          </div>
        </div>

        <div className="tp-product-add-cart-btn-large-wrapper">
          {isAddedToCart ? (
            <Link
              href="/cart"
              className="tp-product-add-cart-btn-large text-center"
            >
              View To Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddProduct(product)}
              type="button"
              className="tp-product-add-cart-btn-large"
              disabled={status === 'out-of-stock'}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
      <div className="tp-product-content-3">
        <div className="tp-product-tag-3">
          <span>{tags[1]}</span>
        </div>
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${_id}`}>{title}</Link>
        </h3>
        {/* Random Rating and Reviews */}
        <div className="tp-product-rating" style={{ margin: "8px 0" }}>
          <span style={{ color: "#FFA41C", fontSize: "14px" }}>
            {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
          </span>
          <span style={{ marginLeft: "8px", fontSize: "13px", color: "#666" }}>
            ({reviewsCount} reviews)
          </span>
        </div>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price old-price">Rs.{previousPrice.toFixed(2)} PKR</span>
        </div>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price-3">Rs.{price.toFixed(2)} PKR</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
