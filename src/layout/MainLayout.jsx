import { Toaster } from "sonner";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "../components/ui/ProductCard.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="">
      <Toaster duration={4000} position={"top-right"} />
      <Navbar />
      <main className="px-7 md:px-14 pb-8 w-full">{children}

      <ProductCard/>
      </main>
      <Footer />
    </div>
  );
}
