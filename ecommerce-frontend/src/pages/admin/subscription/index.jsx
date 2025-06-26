import Navbar from '@/components/admin/navbar/navbar'
import Sidebar from '@/components/admin/sidebar/sidebar'
import { BulkEmail } from '@/components/admin/subscription/BulkEmail'
import SubscriptionTable from '@/components/admin/subscription/SubscriptionTable'
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute'
import Wrapper from '@/layout/wrapper'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const Subscription = () => {
  const [subscribers, setSubscribers] = useState([]); // State to hold subscribers data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [view, setView] = useState('showList'); // Manage which view to show
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe/all`);
      const data = await response.json();
      console.log("data is", data);
      setSubscribers(data.subscribers || []); 
    } catch (error) {
      toast.error("Failed to fetch subscribers");
      setSubscribers([]); // <-- also set empty array on error
    } finally {
      setLoading(false);
    }
  };
  

  const exportToExcel = () => {
    if (subscribers.length === 0) {
      toast.warn("No subscribers to export.");
      return;
    }
    
    const formattedData = subscribers.map(email => ({
      Email: email
    }));
  
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subscribers");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "subscribers.xlsx");
    toast.success("Excel file downloaded!");
  };
  

  const onDelete = async (id) => {
    if (!id) {
      toast.error("Invalid subscriber ID");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this subscriber?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe/delete/${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message || "Subscriber deleted successfully");
        // After deletion, refresh the list
        fetchSubscribers();
      } else {
        toast.error(data.message || "Failed to delete subscriber");
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast.error("An error occurred while deleting subscriber");
    }
  };
  
  return (

    <AdminProtectedRoute>
      <Wrapper>
        <Sidebar />
        <main className="main-content py-0">
          <Navbar />
          <div className="px-4 py-3 d-flex justify-content-between" style={{ backgroundColor: "#cecece" }}>
            <h3>Subscription List</h3>
            <button
              className="btn btn-primary mb-3 rounded-3 mx-2"
              type="button"
              onClick={exportToExcel}
              disabled={loading || subscribers.length === 0}
            >
              Download Excel
            </button>


          </div>
          <div className='container-fluid px-4 py-3'>
            <h3 className='text-center my-3' >Send Message to Everyone in the list</h3>
            <BulkEmail />
            <SubscriptionTable subscribers={subscribers} loading={loading} onDelete={onDelete} />
          </div>

        </main>
      </Wrapper>
    </AdminProtectedRoute>

  )
}

export default Subscription