import React from 'react';

const Navbar = () => {
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;
      
        localStorage.removeItem("token");
        router.push("/login");
      };
    return (
        <nav className="navbar bg-theme navbar-height py-4 px-4 d-flex align-items-center">
            

            <button className="btn btn-danger ms-auto" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
