import { Toaster } from "sonner";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <div className={``}>
        <Navbar />
        <main className="px-7 md:px-14 py-8 pt-12 w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
}
