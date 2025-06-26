import { useSaveOrderMutation } from "@/redux/features/order/orderApi";
import Image from "next/image";
import { useState, useEffect } from "react";
import { notifyError, notifySuccess } from "@/utils/toast";


const BuyWithCodeModal = ({ isOpen, onClose, onSubmit, productItem, quantity }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        address: '',
        contact: '',
        city: '',
        cart: [],
        subTotal: '',
        totalAmount: '',
        status: "Pending",
        invoice: "1233",
        quantity: quantity,
    });
    const [saveOrder] = useSaveOrderMutation();

    useEffect(() => {
        const subTotal = productItem.price;
        const totalAmount = productItem.price * quantity;

        setFormData(prev => ({
            ...prev,
            cart: [
                {
                    product: productItem._id, // or productItem.id depending on your schema
                    quantity: quantity,
                    price: productItem.price,
                }
            ],
            subTotal,
            totalAmount
        }));
    }, [productItem, quantity]);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation for required fields
        if (!formData.name || !formData.lastName || !formData.address || !formData.contact || !formData.city) {
            notifyError("Please fill in all required fields.");
            return;
        }

        // Contact number validation (optional but good)
        if (!/^\d{10,15}$/.test(formData.contact)) {
            notifyError("Please enter a valid contact number (10-15 digits).");
            return;
        }

        // Save the order
        saveOrder(formData)
            .then((res) => {
                console.log("Order response:", res);
                if (res?.error) {
                    notifyError("Something went wrong while placing your order.");
                } else {
                    localStorage.removeItem("cart_products");
                    localStorage.removeItem("couponInfo");
                    notifySuccess("Your Order Confirmed!");
                    router.push(`/order/${res.data?.order?._id}`);
                }
            })
            .catch((err) => {
                console.error("Save order failed:", err);
                notifyError("Failed to place order. Try again.");
            });

        onSubmit(formData);
    };


    if (!isOpen) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between align-items-center">
                        <h5 className="modal-title mb-0">CASH ON DELIVERY</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {/* Product Info */}
                            <div className="d-flex justify-content-between align-items-center border-light border rounded p-2">
                                <div className="d-flex align-items-center">
                                    <div className="position-relative">
                                        <Image src={productItem.img} alt="Free Delivery" className="feature-icon" width={70} height={70} />
                                        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{quantity}</span>
                                    </div>
                                    <strong className='h4 mx-4 fs-7 mt-1'>{productItem.title}</strong>
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="d-flex flex-column border-light border rounded p-2" style={{ backgroundColor: "rgb(235, 235, 235)" }}>
                                <div className="d-flex flex-row justify-content-between align-items-center ">
                                    <span className="fs-5">Subtotal</span>
                                    <strong className='h4 mx-4 fs-6 mt-1'>RS. {productItem.price}</strong>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center ">
                                    <span className="fs-5 mb-2">Shipping</span>
                                    <strong className='h4 mx-4 fs-6 mv'>FREE</strong>
                                </div>

                                <div className="d-flex flex-row justify-content-between border-top border-gray-800 align-items-center ">
                                    <strong className="fs-5 pt-2 d-block">Total</strong>
                                    <span className='h4 mx-4 fs-6 mt-1 pt-2 d-block'>{quantity}(qt) * {productItem.price} = Rs. {productItem.price * quantity}</span>
                                </div>
                            </div>

                            {/* Shipping Method */}
                            <h5 className="mt-4">Shipping method</h5>
                            <div className="d-flex justify-content-between align-items-center border-dark border rounded p-3">
                                <div>
                                    <input type="radio" defaultChecked aria-disabled /> <span>Free Shipping</span>
                                </div>
                                <strong>FREE</strong>
                            </div>

                            {/* Shipping Address */}
                            <h4 className="text-center mt-4">Enter your shipping address</h4>

                            {/* First Name */}
                            <div className="form-group mt-2">
                                <label htmlFor="name">First Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your first name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Address */}
                            <div className="form-group">
                                <label htmlFor="address">Address <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Enter your address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Contact */}
                            <div className="form-group">
                                <label htmlFor="contact">Contact <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    name="contact"
                                    id="contact"
                                    placeholder="Enter your contact number"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* City */}
                            <div className="form-group">
                                <label htmlFor="city">City <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Enter your city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Subtotal */}
                            <div className="form-group">
                                <label htmlFor="subTotal">Subtotal <span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    name="subTotal"
                                    id="subTotal"
                                    value={formData.subTotal}
                                    readOnly
                                    className="form-control"
                                />
                            </div>

                            {/* Total Amount */}
                            <div className="form-group">
                                <label htmlFor="totalAmount">Total Amount <span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    name="totalAmount"
                                    id="totalAmount"
                                    value={formData.totalAmount}
                                    readOnly
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyWithCodeModal;
