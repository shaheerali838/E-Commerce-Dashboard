import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Favorites from "./pages/Favorites.jsx";
import Inbox from "./pages/Inbox.jsx";
import OrderLists from "./pages/OrderList.jsx";
import ProductStock from "./pages/ProductStock.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),

      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/inbox",
          element: <Inbox />,
        },
        {
          path: "/order-lists",
          element: <OrderLists />,
        },
        {
          path: "/product-stock",
          element: <ProductStock />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
