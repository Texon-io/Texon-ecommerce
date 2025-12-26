import SectionHeading from "../../components/ui/SectionHeading.jsx";
import SortBy from "../../components/ui/SortBy.jsx";
import ProductCard from "../../components/ui/ProductCard.jsx";
import {image1, image2, image3, image4} from "@/utils/constants.js";

const products = [
    {title:"Aurla Fabric Accent Chair", price: 55, image_url: image1},
    {title:"Utopia Plant Pots", price: 8, image_url: image2},
    {title:"Round Terra Marble Center Table", price: 35, image_url: image4},
    {title:"Roundhill Fabric Accent Chair", price: 30, image_url: image3},
]

function TopProducts() {
  return (
    <section className="pt-14 w-full">
      <div className={`flex justify-between items-center`}>
        <SectionHeading>Top Products</SectionHeading>
      </div>

      {/*  Top Products  */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-sm:justify-items-center`}
      >
          {products.map((product) => (
              <ProductCard key={product.id}  product={product}/>          ))}
      </div>
    </section>
  );
}

export default TopProducts;
