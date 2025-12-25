import ShopIntro from "./ShopIntro.jsx";
import ProductsList from "./ProductsList.jsx";
import ShopCategories from "./ShopCategories.jsx";
import SortBy from "../../components/ui/SortBy.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";

function Products() {
  return (
    <div className={`w-full pt-4`}>
      {/* Shop Intro Text */}
        <ShopIntro />
        <ShopCategories/>
        <div className={`flex justify-between items-center my-6`}>
            <SectionHeading>Top Products</SectionHeading>
            <SortBy/>
        </div>

        {/*  Products  */}
        <ProductsList/>
    </div>
  );
}

export default Products;
