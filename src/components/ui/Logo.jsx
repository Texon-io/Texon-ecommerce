import { Link } from "react-router-dom";

function Logo({ className = "", props }) {
  return (
    <Link
      to={"/"}
      as={"h6"}
      className={`text-3xl italic font-light ${className}`}
      {...props}
    >
      VipeCart
    </Link>
  );
}

export default Logo;
