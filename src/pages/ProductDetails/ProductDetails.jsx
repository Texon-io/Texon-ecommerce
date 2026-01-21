import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { PageError } from "@/components/ui/PageError";
import { useProductId } from "./useProductId";

export default function ProductDetails() {
  const { isLoading, product, error } = useProductId();

  // Check if the product is not found at all
  if (!product && !isLoading && error)
    return <PageError message={"Product not found!"} />;

  let productdetails = {};

  if (product) {
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

  if (isLoading)
    return (
      <div className="mx-auto max-w-7xl px-0 md:px-6 py-12">
        <div className="flex gap-6 flex-col md:flex-row justify-center items-center">
          <Skeleton className="w-full md:w-1/2 h-[400px] md:h-[500px] lg:h-[600px]" />
          <Skeleton className="w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px]" />
        </div>
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl px-0 md:px-6 py-12 md:mt-24 ">
      {product && (
        <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
          <ProductGallery product={productdetails} />
          <ProductInfo product={productdetails} />
        </div>
      )}
    </section>
  );
}
