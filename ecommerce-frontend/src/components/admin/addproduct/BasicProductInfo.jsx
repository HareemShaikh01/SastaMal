import React from 'react';

const BasicProductInfo = ({ formData, handleChange, errors }) => {
  return (
    <section>
      <h2 className="mb-4 fs-4 fs-md-3 border-bottom pb-2">Basic Information</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Product Title*</label>
          <input   //ok
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Wireless Bluetooth Headphones"
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Product Slug</label>
          <input   //ok
            type="text"
            className="form-control"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g., wireless-bluetooth-headphones"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Product SKU</label>
          <input   //ok
            type="text"
            className="form-control"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SKU"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Detailed product description..."
        />
      </div>
    </section>
  );
};

export default BasicProductInfo;
