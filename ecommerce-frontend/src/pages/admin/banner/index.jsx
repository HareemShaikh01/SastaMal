import FormBanner from '@/components/admin/addBanner/formBanner';
import ShowBanner from '@/components/admin/addBanner/showBanner';
import Navbar from '@/components/admin/navbar/navbar';
import Sidebar from '@/components/admin/sidebar/sidebar';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import Wrapper from '@/layout/wrapper';
import React, { useState } from 'react';

const Banner = () => {
  const [view, setView] = useState('showBanner'); // Manage which view to show

  return (
    <AdminProtectedRoute>
      <Wrapper>
        <Sidebar />
        <main className="main-content py-0 bg-white">
          <Navbar />
          <div className="px-4 py-3 d-flex justify-content-between" style={{backgroundColor:"#cecece"}}>
          <h3>Banner Management</h3>

              {view === "addBanner" ? (
                <button className="btn btn-primary" onClick={() => setView('showBanner')}>Show Banner</button>
              ) : (
                <button className="btn btn-primary" onClick={() => setView('addBanner')}>Add Banner</button>
              )}
            </div>

          <div className='bg-white d-flex justify-content-center p-md-5 px-3 overflow-scroll h-100'>
            {view === "showBanner" ? <ShowBanner /> : <FormBanner setView={setView} />}
          </div>

          
        </main>
      </Wrapper>
    </AdminProtectedRoute>
  );
};

export default Banner;
