// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// Pages
// import Home from './pages/Home';
// import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Wishlist from './pages/Wishlist';
// import Checkout from './pages/Checkout';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import UserDashboard from './pages/Dashboard/UserDashboard';
// import AdminDashboard from './pages/Dashboard/AdminDashboard';
//
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <div>Home</div>
          </MainLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <div>products</div>
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <div>cart</div>
          </MainLayout>
        }
      />
      <Route
        path="/wishlist"
        element={
          <MainLayout>
            <div>wishlist</div>
          </MainLayout>
        }
      />
      {/*<Route path="/checkout" element={<MainLayout><ProtectedRoute><div>checkout</div></ProtectedRoute></MainLayout>} />*/}

      <Route path="/login" element={<div>login</div>} />
      <Route path="/register" element={<div>register</div>} />

      {/*<Route path="/dashboard" element={<MainLayout><ProtectedRoute><div>user dash</div></ProtectedRoute></MainLayout>} />*/}
      {/*<Route path="/admin" element={<MainLayout><AdminRoute><div>admin dash</div></AdminRoute></MainLayout>} />*/}
    </Routes>
  );
}

export default App;
