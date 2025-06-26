import Navbar from '@/components/admin/navbar/navbar';
import Sidebar from '@/components/admin/sidebar/sidebar';
import Wrapper from '@/layout/wrapper';
import React, { useEffect, useState } from 'react';
import ShowCatagories from '@/components/admin/addCatagory/ShowCatagories';
import CategoryManager from '@/components/admin/addCatagory/CategoryManager';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';

const Category = () => {

    const [view, setView] = useState('list'); // 'form' or 'list'
    const [categories, setCategories] = useState([]);

    // Move fetchCategories out of useEffect
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/all`);
            const data = await res.json();
            if (data.result) {
                setCategories(data.result); // Adjust according to your actual API structure
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <AdminProtectedRoute>

            <Wrapper>
                <Sidebar />
                <main className="main-content py-0">
                    <Navbar />

                    <div className="px-4 py-3 d-flex justify-content-between" style={{backgroundColor:"#cecece"}}>
                    <h3>Category Management</h3>
                        {view === 'form' ? (
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setView('list');
                                    fetchCategories();
                                }}
                            >
                                Show Categories
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => setView('form')}
                            >
                                Add Category
                            </button>
                        )}
                    </div>

                    {view === 'form' ? (
                        <CategoryManager />
                    ) : (
                        <ShowCatagories categories={categories} onDeleteSuccess={fetchCategories} />
                    )}
                </main>
            </Wrapper>
        </AdminProtectedRoute>

    );
};

export default Category;
