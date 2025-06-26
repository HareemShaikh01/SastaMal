import React, { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ShowOrder = ({ orders, handleConfirm, loading, fetchOrders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const isCompletedOrder = orders.length && orders[0]?.status === "confirmed";

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = orders.map((order) => order._id);
      setSelectedOrders(allIds);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelect = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };


  const handleDeleteSelected = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order/bulk-delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds: selectedOrders }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Orders deleted successfully");
        fetchOrders(); // Refresh the orders after deletion
        // Optionally refresh the orders state here
      } else {
        toast.error(data.message || "Failed to delete orders");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting orders.");
    }
  };

  if (loading) return <p className="p-3">Loading orders...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">
        {isCompletedOrder ? "📦 Confirmed Orders" : "📦 Pending Orders"}
      </h2>

      {isCompletedOrder && (
        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
          <div>
            <input
              type="checkbox"
              checked={selectedOrders.length === orders.length}
              onChange={handleSelectAll}
            />{" "}
            Select All
          </div>
          <button
            className="btn btn-danger btn-sm"
            disabled={selectedOrders.length === 0}
            onClick={handleDeleteSelected}
          >
            <FaTrash className="me-1" /> Delete Selected
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {orders.map((order, index) => (
            <div className="col" key={order._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">
                      #{index + 1} - {order.user?.name || order.name || "Guest"}
                    </h6>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <span
                    className={`badge ${order.status === "confirmed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="card-body">
                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <div>
                      <strong>Total:</strong> Rs. {order.totalAmount}
                    </div>
                    <div>
                      <strong>Items:</strong> {order.cart?.length || 0}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleExpand(order._id)}
                      >
                        {expandedOrder === order._id ? (
                          <>
                            <FaChevronUp className="me-1" /> Hide Details
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="me-1" /> Show Details
                          </>
                        )}
                      </button>

                      {!isCompletedOrder && (
                        <button
                          className="btn btn-sm btn-success"
                          disabled={order.status === "confirmed"}
                          onClick={() => handleConfirm(index, order._id)}
                        >
                          {order.status === "confirmed" ? (
                            <>
                              <FaCheckCircle className="me-1" /> Confirmed
                            </>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      )}
                    </div>

                    {isCompletedOrder && (
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={() => handleSelect(order._id)}
                      />
                    )}
                  </div>

                  {expandedOrder === order._id && (
                    <div className="mt-3">
                      <div className="mb-2">
                        <strong>Contact:</strong> {order.contact || "N/A"}
                        <br />
                        <strong>Email:</strong> {order.email || "N/A"}
                        <br />
                        <strong>Address:</strong> {order.address || "N/A"}
                      </div>

                      <div className="table-responsive">
                        <table className="table table-sm table-bordered mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.cart?.map((item, i) => (
                              <tr key={i}>
                                <td>{item.name || item.title || "N/A"}</td>
                                <td>Rs. {item.price || "N/A"}</td>
                                <td>{item.quantity || item.qty || 1}</td>
                                <td>
                                  <img
                                    src={item.img}
                                    alt="om"
                                    width={40}
                                    height={40}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowOrder;
