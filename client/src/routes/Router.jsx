import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Index";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UpdateProfile from "../components/UpdateProfile";
import ProfileUser from "../components/ProfileUser";

const router = createBrowserRouter([
 {
  path: "/",
  element: <MainLayout />,
  children: [
   {
    path: "/",
    element: <Home />
   },
   {
    path: "/shop",
    element: <Shop />
   },
   {
    path: "/cart",
    element: <Cart />
   },
   {
    path: "/signin",
    element: <SignIn />
   },
   {
    path: "/signup",
    element: <SignUp />
   },
   {
    path: "/updateProfile",
    element: <UpdateProfile />
   },
   {
    path: "/profileUser",
    element: <ProfileUser />
   }
  ],
 },
]);
export default router;