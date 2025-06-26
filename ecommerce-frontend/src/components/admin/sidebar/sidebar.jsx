import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';
import homeIcon from "@assets/img/admin/admin-icons/icon-home.svg"
import iconSettings from "@assets/img/admin/admin-icons/icon-settings.svg"
import iconLevels from "@assets/img/admin/admin-icons/icon-levels.svg"
import iconAccounts from "@assets/img/admin/admin-icons/icon-accounts.svg"
import iconSubscription from "@assets/img/admin/admin-icons/icon-subscription.svg"
import iconLock from "@assets/img/admin/admin-icons/icon-lock.svg"
import Image from 'next/image';
import { useRouter } from 'next/router';



const Sidebar = () => {
    const router = useRouter();


    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        console.log("sidebar state is", isSidebarOpen)
        setIsSidebarOpen(!isSidebarOpen)
    }
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add("open");
            document.body.classList.add("open");
        } else {
            document.body.classList.remove("open");
        }
    }, [isSidebarOpen]);
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Redirect to login page
        router.push('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-inner">
                
                <header className="sidebar-header">
                    <button
                        style={{ color: 'black !important' }}
                        type="button"
                        className="sidebar-burger"
                        onClick={toggleSidebar}

                    ></button>
                    <h3 style={{ color: "white" }}>Admin Panel</h3>
                </header>
                <nav className="sidebar-nav">
                    <Link href="/admin" className="sidebar-list-item">
                        <Image src={homeIcon} alt="Home Icon" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span">Dashboard</span>
                    </Link>

                    <Link href="/admin/product" className="sidebar-list-item">
                        <Image src={iconLevels} alt="icon Settings" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.2s" }}>Product Management</span>
                    </Link>

                    <Link href="/admin/category" className="sidebar-list-item">
                        <Image src={iconLevels} alt="icon Settings" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.2s" }}>Add Category</span>
                    </Link>

                    <Link href="/admin/banner" className="sidebar-list-item">
                        <Image src={iconSubscription} alt="icon Settings" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.2s" }}>Add Banner</span>
                    </Link>
                    <Link href="/admin/order" className="sidebar-list-item">
                        <Image src={iconAccounts} alt="icon Settings" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.2s" }}>Order Managment</span>
                    </Link>


                    <Link href="/admin/subscription" className="sidebar-list-item">
                        <Image src={iconSubscription} alt="Home Icon" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.3s" }}>Subscription List</span>
                    </Link>

                    {/* <Link href="/admin/services" className="sidebar-list-item">
                        <Image src={iconAccounts} alt="Home Icon" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.3s" }}>Services Section</span>
                    </Link>

                    <Link href="/admin/setting" className="sidebar-list-item">
                        <Image src={iconSettings} alt="icon Settings" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.1s" }}>Settings</span>
                    </Link> */}
                </nav>
                <footer className="sidebar-footer">
                    {/* <button onClick={handleLogout} className="sidebar-list-item mx-4" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                        <Image src={iconLock} alt="Logout Icon" className="sidebar-list-item-img" />
                        <span className="sidebar-list-item-span" style={{ animationDelay: '0.5s' }}>Logout</span>
                    </button> */}
                    <Link href="/" className="sidebar-list-item">
                        <Image src={homeIcon} alt="icon Settings" className="sidebar-list-item-img" />

                        <span className="sidebar-list-item-span" style={{ animationDelay: "0.1s" }}>Store Dashboard</span>
                    </Link>
                </footer>



            </div>
        </div>
    )
}

export default Sidebar