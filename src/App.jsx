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
import Layout from "./components/Layout/Layout.jsx";

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
          element: <h1>Products</h1>,
        },
        {
          path: "/favorites",
          element: <h1>Favorites</h1>,
        },
        {
          path: "/inbox",
          element: <h1>Inbox</h1>,
        },
        {
          path: "/order-lists",
          element: <h1>Order Lists</h1>,
        },
        {
          path: "/product-stock",
          element: <h1>Product Stock</h1>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
