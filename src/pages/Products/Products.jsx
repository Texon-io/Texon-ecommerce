import ShopIntro from "./ShopIntro.jsx";
import ProductsList from "./ProductsList.jsx";
import ShopCategories from "./ShopCategories.jsx";
import SortBy from "../../components/ui/SortBy.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";
import Input from "../../components/ui/Input.jsx";
import {useSearchStore} from "@/pages/Products/searchProducts.js";


function Products() {
  const { searchTerm, setSearch } = useSearchStore();

  return (
    <div className={`w-full pt-4`}>
      {/* Shop Intro Text */}
        <ShopIntro />
        <div className={`w-1/2 mx-auto mt-5`}>
            <Input placeholder={`Search`} value={searchTerm} onChange={(e) => setSearch(e.target.value)} />
        </div>
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
