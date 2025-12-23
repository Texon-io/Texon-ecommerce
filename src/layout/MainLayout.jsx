// src/layout/MainLayout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "sonner";
import Button from "../components/ui/Button.jsx";
import {ArrowRight, ShoppingCart} from "lucide-react";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col mt-10">
      <Toaster duration={4000} position={"top-right"} />
      <Navbar />
      <main className="flex-1 container px-7 md:px-14 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
