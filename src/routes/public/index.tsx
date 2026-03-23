import { createBrowserRouter } from "react-router-dom";

import Home from "../../pages/Home/Home";
import Categories from "../../pages/Categories/Categories";
import Product from "../../pages/Product/Product";
import Favourites from "../../pages/Favourites/Favourites";
import Cart from "../../pages/Cart/Cart";
import Login from "../../pages/Login/LoginPage";
import AdminProtectedRoute from "../../components/AdminProtectedRoute/AdminProtectedRoute";
import Dashboard from "../../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories/:slug",
    element: <Categories />,
  },
  {
    path: "/categories/:slug/:productId",
    element: <Product />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <Dashboard />
      </AdminProtectedRoute>
    ),
  },
]);

export { router };
