// DashBoard.jsx

import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { MdHome, MdLocalShipping, MdHistory, MdTrackChanges, MdEdit } from 'react-icons/md';


const DashBoard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
            {/* Mobile Topbar */}
            <div className="lg:hidden flex justify-between items-center px-4 py-3 bg-white shadow-md">
                <div className="text-xl font-bold text-indigo-600">MyApp</div>
                <button onClick={toggleSidebar}>
                    {/* Your custom SVG icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-800"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static top-0 left-0 z-40 w-64 bg-white border-r shadow-md p-6 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 h-screen lg:min-h-screen`}
            >
                <div className="text-2xl font-bold text-indigo-600 mb-6">Dashboard</div>
                <nav className="space-y-3 flex flex-col">
                    <NavLink to={'/'} className="flex items-center gap-2">
                        <MdHome /> Home
                    </NavLink>

                    <NavLink to={'/dashboard/myparcels'} className="flex items-center gap-2">
                        <MdLocalShipping /> My Parcels
                    </NavLink>

                    <NavLink to={'/dashboard/transaction'} className="flex items-center gap-2">
                        <MdHistory /> Transaction History
                    </NavLink>

                    <NavLink to={'/'} className="flex items-center gap-2">
                        <MdTrackChanges /> Tracking Package
                    </NavLink>

                    <NavLink to={'/'} className="flex items-center gap-2">
                        <MdEdit /> Update Profile
                    </NavLink>



                </nav>
            </aside>

            {/* Overlay on small screens */}
            {sidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
                ></div>
            )}

            {/* Main Content */}
            <main className="w-full">
                <h1></h1>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default DashBoard;
