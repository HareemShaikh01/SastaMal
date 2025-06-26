import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryManager = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [newParent, setNewParent] = useState('');
    const [selectedParentForSub, setSelectedParentForSub] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [newProductType, setNewProductType] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/all`);
        const data = await res.json();
        if (data.result) {
            setAllCategories(data.result);
        }
    };

    const handleAddParent = async () => {
        if (!newParent || !newProductType) return toast.warning('Please fill all fields.');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/add-parent-category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parent: newParent,
                children: [],
                productType: newProductType,
                status: 'Show'
            }),
        });
        const data = await res.json();
        if (data.success) {
            toast.success('Parent category added!');
            setNewParent('');
            setNewProductType('');
            fetchCategories();
        } else {
            toast.error(data.message || 'Something went wrong');
        }
    };

    const handleAddSubCategory = async () => {
        if (!selectedParentForSub || !newSubCategory) return toast.warning('Select both parent and subcategory');
        const parentCat = allCategories.find(cat => cat.parent === selectedParentForSub);
        const updatedChildren = [...(parentCat?.children || []), newSubCategory];

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/add-sub-category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parent: selectedParentForSub,
                children: updatedChildren,
                productType: parentCat.productType,
                status: 'Show'
            }),
        });
        const data = await res.json();
        if (data.success) {
            toast.success('Subcategory added!');
            setNewSubCategory('');
            fetchCategories();
        } else {
            toast.error(data.message || 'Something went wrong');
        }
    };

    // Extract unique product types from allCategories
    const productTypeOptions = [...new Set(allCategories.map(c => c.productType).filter(Boolean))];

    return (
        <div className="container my-4 overflow-scroll">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2>Manage Categories</h2>

            {/* Add Parent Category */}
            <div className="card p-5 my-5">
                <h5>Add Parent Category</h5>
                <input
                    type="text"
                    placeholder="Parent Category"
                    value={newParent}
                    onChange={(e) => setNewParent(e.target.value)}
                    className="form-control my-2"
                />

                <select
                    value={newProductType}
                    onChange={(e) => setNewProductType(e.target.value)}
                    className="form-select my-2"
                >
                    <option value="">-- Select Product Type --</option>
                    {productTypeOptions.map((type, i) => (
                        <option key={i} value={type}>{type}</option>
                    ))}
                </select>

                <button className="btn btn-success" onClick={handleAddParent}>
                    Add Parent Category
                </button>
            </div>

            {/* Add Subcategory */}
            <div className="card p-5 my-5">
                <h5>Add Subcategory</h5>
                <select
                    value={selectedParentForSub}
                    onChange={(e) => setSelectedParentForSub(e.target.value)}
                    className="form-select my-2"
                >
                    <option value="">-- Select Parent --</option>
                    {[...new Set(allCategories.map(c => c.parent))].map((parent, i) => (
                        <option key={i} value={parent}>{parent}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="New Subcategory"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    className="form-control my-2"
                />

                <button className="btn btn-primary" onClick={handleAddSubCategory}>
                    Add Subcategory
                </button>
            </div>
        </div>
    );
};

export default CategoryManager;
