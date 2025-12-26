import { useRef } from "react";
import { useState } from "react";

// const images = [
//   "/public/images/product-img-1.png",
//   "/public/images/product-img-2.png",
//   "/public/images/product-img-3.png",
//   "/public/images/product-img-4.png",
// ];

export function ProductGallery({ productdetails }) {
  const [active, setActive] = useState(productdetails.images[0]);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    setZoomed(true);
    console.log(zoomed, "ZOOM IN HANDLE MOUSE MOVE");
    const rect = imgRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin(`${x}% ${y}%`);
  };

  const resetZoom = () => {
    setOrigin("50% 50%");
    setZoomed(false);
    console.log(zoomed, "ZOOM OUT RESET");
  };

  return (
    <div className="flex gap-4  md:flex-row flex-col">
      {/* Thumbnails */}
      <div className="flex gap-1 md:gap-3  md:flex-col flex-row">
        {productdetails.images.map((img) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className={`h-20 w-20 overflow-hidden rounded-lg border transition duration-300 shadow-sm cursor-pointer
              ${
                active === img
                  ? "border-primary"
                  : "border-border hover:opacity-55 hover:border-brand-main"
              }
            `}
          >
            <img loading={`lazy`} src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        className="relative flex-1 overflow-hidden rounded-xl bg-muted shadow-lg md:cursor-zoom-in
"
        onMouseMove={window.innerWidth > 768 ? handleMouseMove : undefined}
        onMouseLeave={resetZoom}
      >
        <img
          ref={imgRef}
          src={active}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300"
          style={{
            transformOrigin: origin,
            transform: `${zoomed ? "scale(2)" : "scale(1)"}`,
          }}
        />
      </div>
    </div>
  );
}
