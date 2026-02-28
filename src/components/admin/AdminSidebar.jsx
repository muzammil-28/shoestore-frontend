import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({setActiveTab}) {
  const handleLogout = async () => {
    const logoutRes = await fetch(
      `http://localhost/Projects/ShoeStore/shoestore-backend/api/admin/admin-logout.php`,
      {
        method : "POST",
        credentials : "include"
      }
    );
    const logoutData = await logoutRes.json();
    if(logoutData.status)
    {
      setActiveTab("");
    }
  }
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center text-blue-600 font-bold text-xl border-b">Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Dashboard
        </NavLink>
        <NavLink  onClick={() => setActiveTab("products")} className="block px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Products
        </NavLink>
        <NavLink onClick={() => setActiveTab("orders")} className="block px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Orders
        </NavLink>
        <NavLink onClick={() => setActiveTab("users")} className="block px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Users
        </NavLink>
        <NavLink onClick={() => setActiveTab("categories")} className="block px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Categories
        </NavLink>
        <NavLink onClick={handleLogout} className="block px-4 py-2 rounded hover:bg-gray-200 text-red-600">
          Logout
        </NavLink>
      </nav>
    </div>
  );
}
export default Sidebar;