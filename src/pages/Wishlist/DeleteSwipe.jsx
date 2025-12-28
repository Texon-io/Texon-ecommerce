import { Trash2 } from "lucide-react";
import { useState } from "react";

function DeleteSwipe({ children, isRemoving, open, setOpen }) {
  const [startX, setStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Only allow left swipe
    if (diff < 0) {
      setTranslateX(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    if (!isRemoving && open) setTranslateX(0);

    if (translateX < -120) {
      // TODO: DELETE
      setOpen(true);
    } else {
      // Reset position
      setTranslateX(0);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Delete Background */}
      <div className="absolute inset-0 flex items-center justify-end pr-6 rounded-xl bg-red-200">
        <Trash2 className="text-red-500" size={28} />
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
        }}
        className="relative"
      >
        {children}
      </div>
    </div>
  );
}

export default DeleteSwipe;
