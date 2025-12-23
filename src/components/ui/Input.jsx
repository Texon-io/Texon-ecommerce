function Input({ label, name, type = "text", placeholder, ...props }) {
  return (
    <div className="flex flex-col items-start gap-2 my-2">
      <label
        htmlFor={name}
        className="text-gray-600 text-sm font-medium capitalize"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || `${label}...`}
        className="
          w-full px-4 py-3 rounded-2xl
          bg-white border border-gray-300
          focus:border-brand-main/30 focus:ring-2 focus:ring-brand-main/30
          outline-none transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        {...props}
      />
    </div>
  );
}

export default Input;
