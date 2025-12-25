function SectionHeading({ children, className }) {
  return (
    <h5 className={`font-medium text-start text-2xl mb-4 ${className}`}>
      {children}
    </h5>
  );
}

export default SectionHeading;
