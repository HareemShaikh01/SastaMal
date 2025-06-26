import React from "react";

const SubscriptionTable = ({ subscribers, loading, onDelete }) => {
  return (
    <>
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th> {/* 👈 New column for actions */}
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr key={sub._id}>
                <td>{index + 1}</td>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onDelete(sub._id)}
                  >
                    Delete
                  </button> {/* 👈 Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SubscriptionTable;
