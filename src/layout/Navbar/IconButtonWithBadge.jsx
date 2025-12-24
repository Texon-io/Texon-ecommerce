function IconButtonWithBadge({
  children,
  badgeCount,
  onClick,
  ariaLabel,
  className,
}) {
  return (
    <button
      className={`relative cursor-pointer rounded-full p-2 hover:bg-brand-main-trans transition ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      {badgeCount > 0 && (
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] text-brand-white flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </button>
  );
}

export default IconButtonWithBadge;
