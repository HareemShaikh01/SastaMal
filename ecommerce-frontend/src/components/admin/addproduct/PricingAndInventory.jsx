import React from 'react';

const PricingAndInventory = ({ formData, handleChange, errors }) => {
    return (
        <section>
            <h2 className="mb-4 fs-4 fs-md-3 border-bottom pb-2">Pricing & Inventory</h2>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <label className="form-label">Price (PKR)*</label>
                    <input
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
                <div className="col-md-3 mb-3">
                    <label className="form-label">Previous Price</label>
                    <input
                        type="number"
                        name="previousPrice"
                        value={formData.previousPrice || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default PricingAndInventory;
