import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";

const productdetails = {
  title: "Luxe Armchair · Left Arm · Oyster",
  description: `Ultra-functional and elegantly minimalist, our Luxe Armchair
          Collection draws inspiration from Nordic-style décor. It features a
          neutral color palette and natural wood accents, highlighted by
          uniquely designed hexagonal legs.`,
  price: 799,
  hasDiscount: true, //NOTE - set to true if there's a discount
  discountPercentage: 10, //NOTE - set discount percentage if applicable
  images: [
    "/public/images/product-img-1.png",
    "/public/images/product-img-2.png",
    "/public/images/product-img-3.png",
    "/public/images/product-img-4.png",
  ],
};

export default function ProductDetails() {
  return (
    <section className="mx-auto max-w-7xl px-0 md:px-6 py-12 ">
      <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
        <ProductGallery productdetails={productdetails} />
        <ProductInfo productdetails={productdetails} />
      </div>
    </section>
  );
}
