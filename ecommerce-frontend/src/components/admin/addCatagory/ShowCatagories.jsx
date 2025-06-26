import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowCatagories = ({ categories, onDeleteSuccess }) => {
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/delete/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Category deleted successfully!");
                onDeleteSuccess(); // call parent to refresh categories
            } else {
                toast.error(data.message || "Failed to delete category.");
            }
        } catch (err) {
            toast.error("Error deleting category.");
        }
    };

    const handleEdit = () => {
        toast.info("Edit feature is under development.");
    };

    return (
        <div className="table-responsive p-3">
            <ToastContainer position="top-right" autoClose={3000} />
            <table className="table table-bordered table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Parent</th>
                        <th>Children</th>
                        <th>Product Type</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((cat, index) => (
                            <tr key={cat._id}>
                                <td>{index + 1}</td>
                                <td>{cat.parent}</td>
                                <td>{Array.isArray(cat.children) ? cat.children.join(', ') : cat.children}</td>
                                <td>{cat.productType || '-'}</td>
                                <td>
                                    <span className={`badge ${cat.status === 'Show' ? 'bg-success' : 'bg-danger'}`}>
                                        {cat.status}
                                    </span>
                                </td>
                                <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={handleEdit}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No categories found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowCatagories;
