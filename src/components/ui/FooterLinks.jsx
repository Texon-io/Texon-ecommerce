import {Link} from "react-router-dom";

function FooterLinks() {
    const links = [
        { name: "Home", to: "/" },
        { name: "Products", to: "/products" },
        { name: "Cart", to: "/cart" },
        { name: "Dashboard", to: "/dashboard" },
    ];
    return (
        <ul className={`flex flex-col gap-3`}>
            {links.map((link) => (
                <Link to={link.to} as={"li"} key={link.name} className={`capitalize underline-offset-4 hover:underline hover:translate-x-1 transition-all duration-500`}>{link.name}</Link>
            ))}
        </ul>
    )
}

export default FooterLinks;
