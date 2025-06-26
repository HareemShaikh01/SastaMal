import React, { useEffect, useState } from 'react';

const FormCatagory = () => {
    const [formData, setFormData] = useState({
        parent: '',
        children: [],
        productType: '',
        status: 'Show',
    });

    const [allCategories, setAllCategories] = useState([]);
    const [parentOptions, setParentOptions] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [childrenOptions, setChildrenOptions] = useState([]);

    const [isNewParent, setIsNewParent] = useState(false);
    const [isNewProductType, setIsNewProductType] = useState(false);
    const [isNewChild, setIsNewChild] = useState(false);
    const [newChildInput, setNewChildInput] = useState('');
    const [selectedChild, setSelectedChild] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/all`);
                const data = await res.json();

                if (data.result) {
                    setAllCategories(data.result);

                    // Set unique parent and product type options
                    const uniqueParents = [...new Set(data.result.map(item => item.parent))];
                    const uniqueTypes = [...new Set(data.result.map(item => item.productType))];
                    setParentOptions(uniqueParents);
                    setProductTypes(uniqueTypes);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOptions();
    }, []);

    // Filter children based on the selected parent
    const filteredChildren = allCategories
        .filter(cat => cat.parent === formData.parent)
        .flatMap(cat => cat.children || []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'parent') {
            if (value === '__new__') {
                setIsNewParent(true);
                setFormData(prev => ({ ...prev, parent: '', productType: '', children: [] }));
            } else {
                setIsNewParent(false);
                const matched = allCategories.find(cat => cat.parent === value);
                setFormData(prev => ({
                    ...prev,
                    parent: value,
                    productType: matched?.productType || '',
                    children: matched?.children || []
                }));
                setIsNewProductType(false);
            }
        } else if (name === 'productType') {
            if (value === '__new__') {
                setIsNewProductType(true);
                setFormData(prev => ({ ...prev, productType: '' }));
            } else {
                setIsNewProductType(false);
                setFormData(prev => ({ ...prev, productType: value }));
            }
        } else if (name === 'status') {
            setFormData(prev => ({ ...prev, status: value }));
        }
    };

    const handleChildSelect = (e) => {
        const value = e.target.value;
        if (value === '__new__') {
            setIsNewChild(true);
            setSelectedChild('');
        } else {
            setIsNewChild(false);
            setSelectedChild(value);
        }
    };

    const handleAddChild = () => {
        const childToAdd = isNewChild ? newChildInput.trim() : selectedChild;
        if (childToAdd && !formData.children.includes(childToAdd)) {
            setFormData(prev => ({
                ...prev,
                children: [...prev.children, childToAdd]
            }));
        }
        setNewChildInput('');
        setSelectedChild('');
        setIsNewChild(false);
    };

    const handleRemoveChild = (child) => {
        setFormData(prev => ({
            ...prev,
            children: prev.children.filter(c => c !== child)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                alert('Category added successfully!');
                setFormData({ parent: '', children: [], productType: '', status: 'Show' });
                setIsNewParent(false);
                setIsNewProductType(false);
                setIsNewChild(false);
                setNewChildInput('');
                setSelectedChild('');
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            console.error('Submit Error:', error);
        }
    };

    return (
        <div className="container">
            <h3>Add Category</h3>
            <form onSubmit={handleSubmit} className="row g-3">
                {/* Parent */}
                <div className="col-md-6">
                    <label className="form-label">Parent</label>
                    {!isNewParent ? (
                        <select className="form-select" name="parent" value={formData.parent} onChange={handleChange}>
                            <option value="">-- Select Parent --</option>
                            {parentOptions.map((parent, i) => (
                                <option key={i} value={parent}>{parent}</option>
                            ))}
                            <option value="__new__">Add New</option>
                        </select>
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            name="parent"
                            value={formData.parent}
                            onChange={handleChange}
                            placeholder="Enter new parent"
                            required
                        />
                    )}
                </div>

                {/* Children */}
                <div className="col-md-6">
                    <label className="form-label">Children</label>
                    {!isNewChild ? (
                        <select className="form-select" value={selectedChild} onChange={handleChildSelect}>
                            <option value="">-- Select Child --</option>
                            {filteredChildren.map((child, i) => (
                                <option key={i} value={child}>{child}</option>
                            ))}
                            <option value="__new__">Add New</option>
                        </select>
                    ) : (
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={newChildInput}
                                onChange={(e) => setNewChildInput(e.target.value)}
                                placeholder="Enter new child"
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        className="btn btn-outline-primary mt-2"
                        onClick={handleAddChild}
                        disabled={(!selectedChild && !newChildInput.trim())}
                    >
                        Add Child
                    </button>
                    <div className="mt-2">
                        {formData.children.map((child, idx) => (
                            <span key={idx} className="badge bg-secondary me-2">
                                {child}
                                <button type="button" onClick={() => handleRemoveChild(child)} className="btn-close btn-close-white btn-sm ms-2" />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Product Type */}
                <div className="col-md-6">
                    <label className="form-label">Product Type</label>
                    {!isNewProductType ? (
                        <select className="form-select" name="productType" value={formData.productType} onChange={handleChange}>
                            <option value="">-- Select Product Type --</option>
                            {productTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                            <option value="__new__">Add New</option>
                        </select>
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}
                            placeholder="Enter new product type"
                            required
                        />
                    )}
                </div>

                {/* Status */}
                <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                        <option value="Show">Show</option>
                        <option value="Hide">Hide</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="col-12">
                    <button type="submit" className="btn btn-success">Save Category</button>
                </div>
            </form>
        </div>
    );
};

export default FormCatagory;
