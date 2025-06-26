import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    isCheckoutSubmit,
    register,
    errors,
    setShowCard,
    shippingCost,
    discountAmount,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          {/* Header */}
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {/* Item list */}
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>Rs.{item.price.toFixed(2)}</span>
            </li>
          ))}

          {/* 
          
          
          */}
          {/* <li className="tp-order-info-list-shipping">
            <span>Shipping</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                  value="flat_shipping"
                   
                />
                <label
                  onClick={() => handleShippingCost(200)}
                  htmlFor="flat_shipping"
                >
                  Delivery: Today Cost :<span>Rs.200</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(20)}
                  htmlFor="flat_rate"
                >
                  Delivery: 7 Days Cost: <span>Rs.20.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li> */}

          {/* Subtotal */}
          {/* <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>Rs.{total.toFixed(2)}</span>
          </li> */}

          {/* Shipping cost */}
          {/* <li className="tp-order-info-list-subtotal">
            <span>Delivery Cost</span>
            <span>Rs.{shippingCost.toFixed(2)}</span>
          </li> */}

          {/* Discount */}
          {/* <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>Rs.{discountAmount.toFixed(2)}</span>
          </li> */}

          {/* Total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>Rs.{parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      {/* <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div> */}

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
