import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Admin Imports (Updated to match your /pages/Admin/ folder)
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import Dashboard from "./pages/Admin/dashboard.jsx";
import Products from "./pages/Admin/Products.jsx";
import Favorites from "./pages/Admin/Favorites.jsx";
import Inbox from "./pages/Admin/Inbox.jsx";
import OrderLists from "./pages/Admin/OrderList.jsx";
import ProductStock from "./pages/Admin/ProductStock.jsx";

// Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import PublicLayout from "./components/Layout/PublicLayout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Public Storefront Imports (Updated to match your /pages/StoreFront/ folder)
import Home from "./pages/StoreFront/Home.jsx";
import Shop from "./pages/StoreFront/Shop.jsx";
import Cart from "./pages/StoreFront/Cart.jsx";
import Checkout from "./pages/StoreFront/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const router = createBrowserRouter([
    // 1. PUBLIC STOREFRONT ROUTES
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },

    // 2. ADMIN AUTHENTICATION
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },

    // 3. PROTECTED ADMIN DASHBOARD ROUTES
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />,
        },
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <Products /> },
        { path: "favorites", element: <Favorites /> },
        { path: "inbox", element: <Inbox /> },
        { path: "order-lists", element: <OrderLists /> },
        { path: "product-stock", element: <ProductStock /> },
      ],
    },

    // 4. CATCH-ALL 404 ROUTE
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
