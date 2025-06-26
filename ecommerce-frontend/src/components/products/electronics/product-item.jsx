import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, offer_style = false }) => {
  const { _id, img, category, title, reviews, price, discount, status, offerDate, previousPrice } = product || {};
  const [reviewsCount, setReviewsCount] = useState(0);

  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
  useEffect(() => {
    // Generate random review count between 90 and 150
    const randomReviewsCount = Math.floor(Math.random() * (150 - 90 + 1)) + 90;
    setReviewsCount(randomReviewsCount);

    // Generate random rating between 3.5 and 4 (1 decimal place)
    const randomRating = (Math.random() * (4 - 3.5) + 3.5).toFixed(1);
    setRatingVal(Number(randomRating));
  }, []);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <>
      <div
        className={`${offer_style ? "tp-product-offer-item" : "mb-25"
          } tp-product-item transition-3`} style={{ height: "540px" }}
      >
        <div className="tp-product-thumb p-relative fix">
          <div>
            <Image
              src={img}
              width="0"
              height="0"
              sizes="100vw"
              style={{
                width: '100%',
                height: '300px',  // fixed height
                objectFit: 'cover',  // make sure it covers the area nicely
              }}
              alt="product-electronic"
            />

            <div className="tp-product-badge">
              {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
            </div>
          </div>

          {/*  product action */}
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className={`tp-product-action-btn ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                  disabled={status === 'out-of-stock'}
                >
                  <Cart />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn"
              >
                <QuickView />

                <span className="tp-product-tooltip">Quick View</span>
              </button>
              <button
                type="button"
                className={`tp-product-action-btn ${isAddedToWishlist ? 'active' : ''} tp-product-add-to-wishlist-btn`}
                onClick={() => handleWishlistProduct(product)}
                disabled={status === 'out-of-stock'}
              >
                <Wishlist />
                <span className="tp-product-tooltip">Add To Wishlist</span>
              </button>
            </div>
          </div>
        </div>
        {/*  product content */}
        <div className="tp-product-content">
          <div className="tp-product-category">
            <a href="#">{category?.name}</a>
          </div>
          <h3 className="tp-product-title">
            <div >{title}</div>
          </h3>
          <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>({reviewsCount} Reviews)</span>
            </div>
          </div>
          <div className="tp-product-price-wrapper">
            {previousPrice > price ? (
              <>
                <span className="tp-product-price old-price">Rs.{previousPrice}</span>
                <span className="tp-product-price new-price">
                  {" "} Rs.{price}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price">Rs.{price}</span>
            )}
          </div>
          {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerDate?.endDate) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
