import SectionHeading from "../../components/ui/SectionHeading.jsx";
import SortBy from "../../components/ui/SortBy.jsx";
import ProductCard from "../../components/ui/ProductCard.jsx";

function TopProducts() {
    return (
        <section className="pt-12 w-full">
            <div className={`flex justify-between items-center`}>
                <SectionHeading >Top Products</SectionHeading>
                <SortBy/>
            </div>

            {/*  Top Products  */}
            <div className={`grid grid-cols-4 gap-10`}>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </section>
    )
}

export default TopProducts;
