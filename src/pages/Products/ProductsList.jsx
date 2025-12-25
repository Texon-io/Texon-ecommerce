import {useProducts} from "./useProducts.js";
import ProductCard from "@/components/ui/ProductCard.jsx";

function ProductsList() {
    const {products, isLoading} = useProducts();

    if (isLoading) return <p>Loading...</p>

    console.log(products)

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-sm:justify-items-center`}>
            {products.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))}
        </div>
    )
}

export default ProductsList;
