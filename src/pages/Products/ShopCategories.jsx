
import Button from "../../components/ui/Button.jsx";
import {categoriesStore} from "@/pages/Products/categoriesStore.js";

const categories = [
    "All", "Sitting Room", "Kitchen", "Chairs", "Bedroom", "Accessories",
]

function ShopCategories() {

    const {category, setCategory} = categoriesStore();
    return (
        <div className={`flex items-center max-sm:flex-wrap justify-start gap-4 mt-10`}>
            {categories.map(item=>(
                item === category ? <Button key={item} onClick={() => setCategory(item)}>{item}</Button> : <Button
                    key={item}
                    onClick={() => setCategory(item)}
                    variant={"category"}>{item}</Button>
            ))}
        </div>
    )
}

export default ShopCategories;
