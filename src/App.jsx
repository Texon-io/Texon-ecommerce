import { Routes, Route } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import UserDashboard from "./pages/UserDash/UserDash.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails";


const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 60 *1000,
        }
    }
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Routes>
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
                <Route path="/productdetails" element={<MainLayout><ProductDetails /></MainLayout>} />
                <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
                <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
                <Route path="/login" element={<div>login</div>} />
                <Route path="/register" element={<div>register</div>} />
                <Route path="/dashboard" element={<MainLayout><UserDashboard /></MainLayout>} />
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
