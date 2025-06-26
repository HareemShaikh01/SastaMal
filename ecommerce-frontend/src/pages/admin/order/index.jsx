import FormProduct from '@/components/admin/addproduct/FormProduct';
import Navbar from '@/components/admin/navbar/navbar';
import Sidebar from '@/components/admin/sidebar/sidebar';
import Wrapper from '@/layout/wrapper';
import React, { useEffect, useState } from 'react';
import ShowOrder from '@/components/admin/order/ShowOrder';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS for the toast


const OrderManagement = () => {
    const [pendingOrders, setPendingOrders] = useState([]);  // For pending orders
    const [completOrders, setCompletOrders] = useState([]);  // For all orders
    const [orders, setOrders] = useState([]);  // For all orders
    const [loading, setLoading] = useState(true);

    const [view, setView] = useState('showOrder'); // Manage which view to show

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order/get-orders`);
            const data = await res.json();
            if (data.success && data.data) {
                // Separate orders by status
                const confirmedOrder = data.data.filter((order) => order.status === "confirmed");
                const pendingOrder = data.data.filter((order) => order.status === "pending");
                setPendingOrders(pendingOrder);
                setCompletOrders(confirmedOrder); // Store all orders
                setOrders(data.data); // Store all orders

            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchOrders();
    }, []);


    const handleConfirm = async (index, orderId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order/update-status/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "confirmed" }),
            });

            const data = await res.json();
            if (data.success) {
                setOrders((prev) => {
                    const updated = [...prev];
                    updated[index].status = "confirmed";
                    return updated;
                });

                // Show a success toast
                toast.success("Order confirmed successfully!");
                fetchOrders();


            } else {
                // Show an error toast
                toast.error("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error confirming order:", error);
            // Show an error toast
            toast.error("Error confirming the order.");
        }
    };


    return (
        <AdminProtectedRoute>
            <Wrapper>
                <Sidebar />
                <main className="main-content py-0">
                    <Navbar />
                    <div className="px-4 py-3 d-flex justify-content-between" style={{ backgroundColor: "#cecece" }}>
                        <h3>Order Management</h3>

                        {view === "showOrder" ? (
                            <button className="btn btn-primary" onClick={() => setView('addOrder')}>Confirmed</button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setView('showOrder')}>Pending</button>
                        )}
                    </div>

                    <div className='bg-white d-flex justify-content-center p-md-5 px-3 overflow-scroll h-100'>
                        {view === "showOrder" ?
                            <ShowOrder orders={pendingOrders} handleConfirm={handleConfirm} loading={loading} fetchOrders={fetchOrders}/>
                            :
                            <ShowOrder orders={completOrders} handleConfirm={handleConfirm} loading={loading} fetchOrders={fetchOrders}/>
                        }
                    </div>
                </main>
            </Wrapper>
        </AdminProtectedRoute>
    );
};

export default OrderManagement;
