export function PageSkeletonLoading() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 rounded-xl bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
