import { useParams } from "react-router";
import { useProducts } from "../Products/useProducts";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { PageError } from "@/components/ui/PageError";

// const productdetails = {
//   title: "Luxe Armchair · Left Arm · Oyster",
//   description: `Ultra-functional and elegantly minimalist, our Luxe Armchair
//           Collection draws inspiration from Nordic-style décor. It features a
//           neutral color palette and natural wood accents, highlighted by
//           uniquely designed hexagonal legs.`,
//   price: 799,
//   hasDiscount: true, //NOTE - set to true if there's a discount
//   discountPercentage: 10, //NOTE - set discount percentage if applicable
//   images: [
//     "/public/images/product-img-1.png",
//     "/public/images/product-img-2.png",
//     "/public/images/product-img-3.png",
//     "/public/images/product-img-4.png",
//   ],
// };

export default function ProductDetails() {
  const { id } = useParams();
  const { products, status } = useProducts();

  const product = products.find((p) => p.id === id);

  if (!product && status === "success")
    return <PageError message={"Product not found!"} />;

  let productdetails = {};

  if (status === "success") {
    productdetails = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      hasDiscount: product.discount > 0, //NOTE - set to true if there's a discount
      discountPercentage: product.discount, //NOTE - set discount percentage if applicable
      images: [
        product.image_url,
        product.image_url,
        product.image_url,
        product.image_url,
      ], //NOTE - array of image URLs
    };
  }
  // console.log("from products details", status, products);
  console.log("specific product", product);

  if (status === "pending")
    return (
      <div className="mx-auto max-w-7xl px-0 md:px-6 py-12">
        <div className="flex gap-6 flex-col md:flex-row justify-center items-center">
          <Skeleton className="w-full md:w-1/2 h-[400px] md:h-[500px] lg:h-[600px]" />
          <Skeleton className="w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px]" />
        </div>
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl px-0 md:px-6 py-12 ">
      {product && (
        <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
          <ProductGallery product={productdetails} />
          <ProductInfo product={productdetails} />
        </div>
      )}
    </section>
  );
}
