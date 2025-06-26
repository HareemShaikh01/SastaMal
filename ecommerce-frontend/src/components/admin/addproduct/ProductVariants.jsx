import React from 'react';
import Image from 'next/image';

const ProductVariants = ({ formData, errors, handleChange, addVariant, removeVariant, setFormData }) => {
    return (
        <section>
            <h2 className="mb-4 fs-4 fs-md-3 border-bottom pb-2">Product Variants</h2>
            {errors.variants && <div className="alert alert-danger">{errors.variants}</div>}

            <div className="card p-3 mb-4 bg-white">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Color Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="colorName"
                            value={formData.colorName}
                            onChange={handleChange}
                            placeholder="e.g., Midnight Black"
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Color Code</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="colorCode"
                                value={formData.colorCode}
                                onChange={handleChange}
                                placeholder="Hex code (e.g., #000000)"
                            />
                            {formData.colorCode && (
                                <span
                                    className="input-group-text"
                                    style={{
                                        backgroundColor: formData.colorCode,
                                        width: '40px',
                                        border: '1px solid #dee2e6'
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Variant Image*</label>
                        <input
                            type="file"
                            className="form-control"
                            name="variantImage"
                            onChange={handleChange}
                            accept="image/*"
                        />
                        {formData.variantImage && (
                            <div className="mt-2">
                                <Image
                                    src={URL.createObjectURL(formData.variantImage)} // temporary URL for preview
                                    alt="Variant preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '50px' }}
                                    width={50} // fixed width
                                    height={50} // fixed height
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="form-label">Available Sizes*</label>
                    <div className="d-flex flex-wrap gap-2">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                                key={size}
                                type="button"
                                className={`btn btn-sm ${formData.variantSizes.includes(size) ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => {
                                    setFormData(prev => {
                                        const newSizes = prev.variantSizes.includes(size)
                                            ? prev.variantSizes.filter(s => s !== size)
                                            : [...prev.variantSizes, size];
                                        return { ...prev, variantSizes: newSizes };
                                    });
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-3 d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={addVariant}
                    >
                        Add Variant
                    </button>
                </div>
            </div>

            {/* Variants List */}
            {formData.variants.length > 0 && (
                <div className="mb-4">
                    <h5 className="mb-3">Added Variants</h5>
                    <div className="row g-3">
                        {formData.variants.map((variant, index) => (
                            <div key={index} className="col-md-6">
                                <div className="card p-3 position-relative">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                        onClick={() => removeVariant(index)}
                                    >
                                        ×
                                    </button>
                                    <div className="d-flex align-items-center">
                                        {variant.image && (
                                            <Image
                                                src={URL.createObjectURL(variant.image)} // temporary URL for preview
                                                alt={variant.colorName}
                                                className="rounded me-3"
                                                width={60} // fixed size
                                                height={60} // fixed size
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                        <div>
                                            <h6 className="mb-1">
                                                {variant.colorName}
                                                {variant.colorCode && (
                                                    <span
                                                        className="ms-2 d-inline-block rounded-circle"
                                                        style={{
                                                            width: '12px',
                                                            height: '12px',
                                                            backgroundColor: variant.colorCode
                                                        }}
                                                    />
                                                )}
                                            </h6>
                                            <div className="d-flex flex-wrap gap-1">
                                                {variant.sizes.map(size => (
                                                    <span key={size} className="badge bg-secondary">{size}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductVariants;
