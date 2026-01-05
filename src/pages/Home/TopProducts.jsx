import SectionHeading from "../../components/ui/SectionHeading.jsx";
import SortBy from "../../components/ui/SortBy.jsx";
import ProductCard from "../../components/ui/ProductCard.jsx";
import {image1, image2, image3, image4} from "@/utils/constants.js";

const products = [
    {id: "aae8de58-cebd-4d47-8e16-830e376e1e94", title:"Auria Fabric Accent Chair", price: 55, image_url: image1},
    {id: "428d191c-596b-4a96-8b2c-babaa064ef96", title:"Utopia Plant Pots", price: 8, image_url: image2},
    {id: "14cb71dd-305c-4aea-9e66-fa84e291d0b6", title:"Round Terra Marble Center Table", price: 35, image_url: image4},
    {id: "d469aeca-7039-4e5f-8e91-0366d1f7a18f", title:"Roundhill Fabric Accent Chair", price: 30, image_url: image3},
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
