import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home/Index";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UpdateProfile from "../components/UpdateProfile";
import ProfileUser from "../components/ProfileUser";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Index";
import AddProducts from "../pages/AddProduct/Index";
import ManageItems from "../pages/ManageItems/Index";
import AdminRoute from "../ProtectedRoutes/AdminRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/updateProfile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profileUser",
        element: (
          <ProtectedRoute>
            <ProfileUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProducts />,
      },
      {
        path: "manageItems",
        element: <ManageItems />,
      },
    ],
  },
]);
export default router;
