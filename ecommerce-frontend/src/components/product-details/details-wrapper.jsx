import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

// internal
import { AskQuestion, CompareTwo, WishlistTwo } from '@/svg';
import DetailsBottomInfo from './details-bottom-info';
import ProductDetailsCountdown from './product-details-countdown';
import ProductQuantity from './product-quantity';
import { add_cart_product } from '@/redux/features/cartSlice';
import { add_to_wishlist } from '@/redux/features/wishlist-slice';
import { add_to_compare } from '@/redux/features/compareSlice';
import { handleModalClose } from '@/redux/features/productModalSlice';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import ShippingInfo from '../ShippingInfo';
import BuyWithCodeModal from '../order/BuyWithCodeModal';

const DetailsWrapper = ({ productItem, handleImageActive, activeImg, detailsBottom = false }) => {
  const { sku, img, title, imageURLs, category, description, discount, price, status, offerDate, previousPrice } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [randomReviews, setRandomReviews] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Generate random rating between 2 and 5
    const randomRating = (Math.random() * (5 - 2) + 2).toFixed(1);
    setRatingVal(Number(randomRating));

    // Generate random review count between 2 and 5
    const reviewsCount = Math.floor(Math.random() * (100 - 90 + 1)) + 90;
    setRandomReviews(reviewsCount);
  }, []);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  const handleOrderSubmit = (data) => {
    console.log("Order data submitted:", data);
    // Here, you can call your backend API to save the order.
    setIsModalOpen(false);
  };


  return (
    <div className="tp-product-details-wrapper">
      <div className="d-flex align-items-center">
        <Image src="/assets/icons/suggestion.png" alt="Verified" className="verified-icon" width={340} height={64} />


      </div>
      <div className="tp-product-details-category mt-2">
        <span>{category.name}</span>
      </div>
      <h3 className="tp-product-details-title">{title}</h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-details-reviews">
            <span>({randomReviews} Review)</span>
          </div>
        </div>
      </div>
      <p>{textMore ? description : `${description.substring(0, 100)}...`}
        <span onClick={() => setTextMore(!textMore)}>{textMore ? 'See less' : 'See more'}</span>
      </p>

      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        {previousPrice > price ? (
          <>
            <span className="tp-product-details-price old-price">Rs.{previousPrice}</span>
            <span className="tp-product-details-price new-price"> Rs.{price}</span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">Rs.{price.toFixed(2)}</span>
        )}
      </div>



      {/* variations */}
      {imageURLs.some(item => item?.color && item?.color?.name) && <div className="tp-product-details-variation">
        <div className="tp-product-details-variation-item">
          <h4 className="tp-product-details-variation-title">Color :</h4>
          <div className="tp-product-details-variation-list">
            {imageURLs.map((item, i) => (
              <button onClick={() => handleImageActive(item)} key={i} type="button"
                className={`color tp-color-variation-btn ${item.img === activeImg ? "active" : ""}`} >
                <span
                  data-bg-color={`${item.color.clrCode}`}
                  style={{ backgroundColor: `${item.color.clrCode}` }}
                ></span>
                {item.color && item.color.name && (
                  <span className="tp-color-variation-tootltip">
                    {item.color.name}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>}

      {/* if ProductDetailsCountdown true start */}
      {offerDate?.endDate && <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />}
      {/* if ProductDetailsCountdown true end */}

      <div className="product-features my-4">
        <div className="feature-item my-1">
          <Image src="/assets/icons/delivery.png" alt="Free Delivery" className="feature-icon" width={30} height={28} />
          <strong className='h4 mx-2 fs-6 mt-1'>Free Delivery All Over Pakistan</strong>
        </div>
        <div className="feature-item my-2">
          <Image src="/assets/icons/box.png" alt="Free Delivery" className="feature-icon" width={30} height={28} />
          <strong className='h4 mx-2 fs-6 mt-2'>Order Deliver Within 3 Working Days</strong>
        </div>
        <div className="feature-item my-1">
          <Image src="/assets/icons/exchange.png" alt="Free Delivery" className="feature-icon" width={30} height={28} />
          <strong className='h4 mx-2 fs-6 mt-1'>Return your parcel in 7 days</strong>
        </div>
      </div>


      {/* actions */}
      <div className="tp-product-details-action-wrapper mt-5">
        <h3 className="tp-product-details-action-title">Quantity</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {/* product quantity */}
          <ProductQuantity setQuantity={setQuantity} />
          {/* product quantity */}
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button onClick={() => handleAddProduct(productItem)} disabled={status === 'out-of-stock'} className="tp-product-details-add-to-cart-btn w-100">Add To Cart</button>
          </div>
        </div>

        <button
          className="btn rounded-pill d-flex align-items-center justify-content-center gap-2 px-5 py-3 mx-auto"
          style={{ backgroundColor: '#000', color: '#fff' }}
          onClick={() => setIsModalOpen(true)}
        >
          <ShoppingCart size={20} />
          <strong>Buy with Cash on Delivery</strong>
        </button>

        {/* WhatsApp Button */}
        <Link
          href={`https://wa.me/923104626389?text=${encodeURIComponent(`Hi! I'm interested in the product: ${title} (SKU: ${sku})`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="btn rounded-pill d-flex align-items-center justify-content-center gap-2 px-5 py-3 mx-auto"
            style={{ backgroundColor: '#25D366', color: '#fff', marginTop: '10px' }}
          >
            <FaWhatsapp size={20} />
            <strong>Chat on WhatsApp</strong>
          </button>
        </Link>
      </div>

      <BuyWithCodeModal
        isOpen={isModalOpen}
        onClose={() => {
          console.log("Closing modal"); // Add this for debugging
          setIsModalOpen(false);
        }}
        onSubmit={handleOrderSubmit}
        productItem={productItem}
        quantity={quantity}
      />
      <ShippingInfo />


      {/* <div style="margin-top: 20px; font-family: Arial, sans-serif;">
        <div style="display: flex; align-items: center;">
          <img src="path-to-your-image/739faca4-1eaf-4b6e-b292-b81afd45a3cd.png" alt="Reviews and Influencers" style="max-width: 100%; height: auto;"/>
        </div>
        <div style="margin-top: 10px;">
          <strong style="font-size: 18px;">4.9</strong>
          <span style="color: #888;">(140 reviews)</span>
        </div>
      </div> */}


      {/* product-details-action-sm start */}
      <div className="tp-product-details-action-sm mt-3">
        <button disabled={status === 'out-of-stock'} onClick={() => handleCompareProduct(productItem)} type="button" className="tp-product-details-action-sm-btn px-2">
          <CompareTwo />
          Compare
        </button>
        <button disabled={status === 'out-of-stock'} onClick={() => handleWishlistProduct(productItem)} type="button" className="tp-product-details-action-sm-btn px-2">
          <WishlistTwo />
          Add Wishlist
        </button>

      </div>
    </div>
  );
};

export default DetailsWrapper;
