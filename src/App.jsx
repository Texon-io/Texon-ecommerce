import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import UserDashboard from "./pages/UserDash/UserDash.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Register from "@/pages/auth/Register.jsx";
import Login from "@/pages/auth/Login.jsx";
import ForgetPassword from "@/pages/auth/ForgetPassword.jsx";
import Reset from "@/pages/auth/Reset.jsx";
import ProtectedRoute from "@/pages/auth/ProtectedRoute.jsx";
import ScrollToTop from "@/components/ui/ScrollToTop.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/BlogDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster duration={4000} position={"top-left"} />
      <ScrollToTop />

      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          }
        />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/productdetails/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/userdashboard"
          element={
            <MainLayout>
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<Reset />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
