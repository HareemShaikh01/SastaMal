import React, { useEffect, useState } from 'react';
import EditProduct from './EditProduct';
import Image from 'next/image';
import { FaClipboard, FaEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowProducts = ({ products, setProducts, fetchProducts }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editProductData, setEditProductData] = useState({});

    const handleCopy = (product) => {
        const url = `https://www.sastamal.store/product-details/${product._id}`;
        navigator.clipboard.writeText(url);
        toast.success('Product URL copied to clipboard!');
    };



    useEffect(() => {
        if (showEdit) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [showEdit]);

    const handleEdit = (product) => {
        setShowEdit(true);
        setEditProductData(product);
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${productId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Product deleted successfully!");
                setProducts(products.filter(p => p._id !== productId));
            } else {
                toast.error("Delete failed: " + data.message);
            }
        } catch (err) {
            toast.error("Something went wrong while deleting the product.");
        }
    };

    return (
        <div className="table-responsive w-100 container-fluid position-relative mt-3">
            <ToastContainer />

            {/* Modal Overlay */}
            {showEdit && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1050,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflowY: 'auto',
                        padding: '20px'
                    }}
                >
                    <EditProduct
                        fetchProducts={fetchProducts}
                        setShowEdit={setShowEdit}
                        productData={editProductData}
                        setProductData={setEditProductData}
                    />
                </div>
            )}

            <table className="table table-bordered table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Product Url</th>
                        <th>Prev Price</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={product.img}
                                        alt="Product Image"
                                        width={70}
                                        height={70}
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.parent}</td>
                                <td className="d-flex flex-row gap-1 align-items-center justify-content-center">
                                    <a
                                        href={`https://www.sastamal.store/product-details/${product._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEye />
                                    </a>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleCopy(product)}
                                    >
                                        <FaClipboard />
                                    </button>
                                </td>
                                <td>Rs.{product.previousPrice}</td>
                                <td>Rs.{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <span className={`badge ${product.status === 'in-stock' ? 'bg-success' : 'bg-danger'}`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowProducts;
