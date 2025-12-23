import {Link} from "react-router-dom";

function Button({
                    size = "md", // sm, md, lg
                    children,
                    onClick,
                    disabled = false,
                    variant = "main", // main, secondary, outline
                    rounded = false,   // true = rounded-full, false = rounded-md
                    to,
                    ...props
                }) {
    const sizeClasses = rounded
        ? { sm: "p-2 text-sm", md: "p-3 text-base", lg: "p-5 text-lg" }
        : { sm: "px-3 py-1.5 text-sm", md: "px-6 py-2 text-base", lg: "px-6 py-2 text-lg" };

    const variantClasses = {
        main: "bg-brand-main text-white hover:bg-brand-main2 active:bg-brand-main2",
        secondary: "bg-brand-white text-black hover:bg-gray-50 active:bg-gray-300",
        outline: "bg-transparent border border-black/75 text-black hover:border-black hover:opacity-100",
    };

    const baseClass = `
    ${rounded ? "rounded-full" : "rounded-4xl"}
    capitalize font-medium shadow hover:shadow-lg
    disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer
    transition-all duration-300
    ${variant !== "outline" ? "focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2" : ""}
  `;

    const classNames = `${sizeClasses[size]} ${variantClasses[variant]} ${baseClass}`;

    if (to) {
        return (
            <Link to={to} className={classNames} {...props}>
        <span className="flex items-center justify-center gap-2">
          {children}
        </span>
            </Link>
        );
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`${classNames}`}
            {...props}
        >
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
        </button>
    );
}

export default Button;