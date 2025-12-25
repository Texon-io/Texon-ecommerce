import { Routes, Route } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// Pages
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Checkout from "./pages/Checkout/Checout.jsx";
import UserDashboard from "./pages/userDash/UserDash.jsx";

// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminDashboard from './pages/Dashboard/AdminDashboard';
//
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 60 *1000,
        }
    }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                path="/products"
                element={
                    <MainLayout>
                        <Products />
                    </MainLayout>
                }
            />
            <Route
                path="/cart"
                element={
                    <MainLayout>
                        <Cart />
                    </MainLayout>
                }
            />
            <Route
                path="/wishlist"
                element={
                    <MainLayout>
                        <Wishlist />
                    </MainLayout>
                }
            />
            {/*<Route path="/checkout" element={<MainLayout><ProtectedRoute><div>checkout</div></ProtectedRoute></MainLayout>} />*/}
            <Route
                path="/checkout"
                element={
                    <MainLayout>
                        <Checkout />
                    </MainLayout>
                }
            />{" "}
            // temporary without protection
            <Route path="/login" element={<div>login</div>} />
            <Route path="/register" element={<div>register</div>} />
            {/*<Route path="/dashboard" element={<MainLayout><ProtectedRoute><div>user dash</div></ProtectedRoute></MainLayout>} />*/}
            <Route
                path="/dashboard"
                element={
                    <MainLayout>
                        <UserDashboard />
                    </MainLayout>
                }
            />{" "}
            // temporary without protection
            {/*<Route path="/admin" element={<MainLayout><AdminRoute><div>admin dash</div></AdminRoute></MainLayout>} />*/}
        </Routes>
    </QueryClientProvider>
  );
}

export default App;
