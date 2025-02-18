import logo from "/Logo.png";
import { Outlet } from "react-router";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const AdminLayout = () => {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify*start mb-3">
                  <img src="/Logo.png" className="w-20" />
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <div className="flex-shrink mx-4 text-gray-400">Menu</div>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/dashboard">
                  <MdSpaceDashboard />
                  Dashboard
                </a>
              </li>
              <li>
                <a>
                  <FaCartArrowDown />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/dashboard/add-product">
                  <FaCartPlus />
                  Add Product
                </a>
              </li>
              <li>
                <a href="/dashboard/manageItems">
                  <MdOutlineDashboardCustomize />
                  Manage Item
                </a>
              </li>
              <li>
                <a>
                  <FaUser />
                  All User
                </a>
              </li>
              <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <div className="flex-shrink mx-4 text-gray-400">Menu</div>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Products</a>
              </li>
              <li>
                <a>Order Tracking</a>
              </li>
              <li>
                <a>Customer Support</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>You are not an Admin! Back to Home</div>
      )}
    </div>
  );
};

export default AdminLayout;
