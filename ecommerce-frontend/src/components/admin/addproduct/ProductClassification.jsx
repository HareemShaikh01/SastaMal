import React from 'react';

const ProductClassification = ({ formData, setFormData, categories }) => {
  // Get all unique product types and parents
  const uniqueTypes = [...new Set(categories.map(cat => cat.productType).filter(Boolean))];
  const uniqueParents = [...new Set(categories.map(cat => cat.parent).filter(Boolean))];

  // Get child categories based on selected parent
  const selectedParent = categories.find(cat => cat.parent === formData.parent);
  const childCategories = selectedParent ? selectedParent.children : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "parent") {
      const parentData = categories.find(cat => cat.parent === value);
      setFormData(prev => ({
        ...prev,
        parent: value,
        children: "", // reset child
        productType: parentData?.productType || "",
        category: {
          name: value,
          id: parentData?._id || "",
        },
      }));
    } else if (name === "children") {
      setFormData(prev => ({
        ...prev,
        children: value,
      }));
    } else if (name === "productType") {
      setFormData(prev => ({
        ...prev,
        productType: value,
      }));
    }
  };

  return (
    <section>
      <h2 className="mb-4 fs-4 fs-md-3 border-bottom pb-2">Product Classification</h2>
      <div className="row">

        <div className="col-md-4 mb-3">
          <label className="form-label">Product Type</label>
          <select
            className="form-select"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Parent Category</label>
          <select
            className="form-select"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
            required
          >
            <option value="">Select Parent Category</option>
            {uniqueParents.map((parent, idx) => (
              <option key={idx} value={parent}>{parent}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Child Category</label>
          <select
            className="form-select"
            name="children"
            value={formData.children}
            onChange={handleChange}
            disabled={!formData.parent}
            required
          >
            <option value="">Select Child Category</option>
            {childCategories.map((child, idx) => (
              <option key={idx} value={child}>{child}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProductClassification;
