import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { Rating } from "react-simple-star-rating";

const ProductItem1 = ({ product, prdCenter = false, primary_style = false }) => {
    const { _id, img, title, discount, price, tags, status, previousPrice } = product || {};
    const { cart_products } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const isAddedToCart = cart_products.some((prd) => prd._id === _id);
    const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
    const dispatch = useDispatch();

    const [showFullTitle, setShowFullTitle] = useState(false);

    // Random reviews and rating
    const [randomReviews, setRandomReviews] = useState(0);
    const [randomRating, setRandomRating] = useState(0);

    useEffect(() => {
        setRandomReviews(Math.floor(Math.random() * (150 - 90 + 1)) + 90); // between 90 and 150
        setRandomRating((Math.random() * (4 - 3.5) + 3.5).toFixed(1)); // between 3.5 and 4, one decimal
    }, []);

    // handle add product
    const handleAddProduct = (prd) => {
        dispatch(add_cart_product(prd));
    };
    // handle wishlist product
    const handleWishlistProduct = (prd) => {
        dispatch(add_to_wishlist(prd));
    };

    // limit to 5 words
    const getLimitedTitle = (str) => {
        const words = str.split(" ");
        return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
    };

    return (
        <div
            className={`tp-product-item-3 mb-50 ${primary_style ? "tp-product-style-primary" : ""} ${prdCenter ? "text-center" : ""}`}
        >
            <div className="tp-product-thumb-3 fix p-relative z-index-1">
                <Link href={`/product-details/${_id}`}>
                    <div style={{
                        width: '100%',
                        height: '130px',  // fixed height
                        objectFit: 'cover',  // make sure it covers the area nicely
                    }}>
                        <Image
                            src={img}
                            alt="product image"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </Link>
                <div className="tp-product-badge">
                    {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
                </div>
            </div>
            <div className="tp-product-content-3">
                <div className="tp-product-tag-3">
                    <span>{tags[1]}</span>
                </div>
                <h3 className="tp-product-title-3" style={{ fontSize: "14px" }}>
                    <Link href={`/product-details/${_id}`}>
                        {showFullTitle ? title : getLimitedTitle(title)}
                    </Link>
                    {title.split(" ").length > 5 && (
                        <button
                            onClick={() => setShowFullTitle(!showFullTitle)}
                            style={{
                                marginLeft: "8px",
                                fontSize: "12px",
                                background: "none",
                                border: "none",
                                color: "#0070f3",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            {showFullTitle ? "Show Less" : "Read More"}
                        </button>
                    )}
                </h3>

                {/* Rating */}
                <div className="tp-product-rating d-flex align-items-center">
                    <div className="tp-product-rating-icon">
                        <Rating allowFraction size={13} initialValue={randomRating} readonly />
                    </div>
                    <div className="tp-product-rating-text" style={{ fontSize: "10px" }}>
                        <span>({randomReviews} Reviews)</span>
                    </div>
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

export default ProductItem1;
