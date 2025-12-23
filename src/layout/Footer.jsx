import Logo from "../components/ui/Logo.jsx";
import FooterLinks from "../components/ui/FooterLinks.jsx";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="bg-black text-white py-10 md:py-16 px-6 md:px-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Copyright */}
        <div className="flex flex-col justify-between">
          <Logo />
          <p className="text-xs opacity-75 mt-8">
            &copy; {currentYear} — All rights reserved
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-sm opacity-75 mb-2">Contact Us</h3>
            <a
              href="tel:+2012345678912"
              className="block font-normal hover:underline focus:underline"
            >
              +20 1234 567 8912
            </a>
          </div>

          <div>
            <h3 className="text-sm opacity-75 mb-2">Email</h3>
            <a
              href="mailto:texondev.info@gmail.com"
              target="_blank"
              className="block font-normal hover:underline focus:underline"
            >
              texondev.info@gmail.com
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-sm opacity-75 mb-4">Quick Links</h3>
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
