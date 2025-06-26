import Navbar from '@/components/admin/navbar/navbar'
import Sidebar from '@/components/admin/sidebar/sidebar'
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute'
import Wrapper from '@/layout/wrapper'
import React from 'react'

const Services = () => {
  return (

    <AdminProtectedRoute>
      <Wrapper>
        <Sidebar />
        <main className="main-content py-0">
          <Navbar />
          <div className="main-content-div">

            {/* now write the code here for further developments */}

          </div>
        </main>
      </Wrapper>
    </AdminProtectedRoute>

  )
}

export default Services