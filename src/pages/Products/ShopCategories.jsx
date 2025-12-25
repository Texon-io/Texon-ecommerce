import {useState} from "react";

import Button from "../../components/ui/Button.jsx";

const categories = [
    "All", "Sofa", "Sitting Room", "Kitchen", "Accessories", "Bedroom",
]

function ShopCategories() {
    const [category, setCategory] = useState("All")
    return (
        <div className={`flex items-center justify-start gap-4 mt-10`}>
            {categories.map(item=>(
                item === category ? <Button key={item} onClick={() => setCategory(item)}>{item}</Button> : <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full bg-brand-gray-secondary px-5 py-2.5 font-medium hover:bg-brand-main hover:text-white cursor-pointer transition-colors duration-300`}>{item}</button>
            ))}
        </div>
    )
}

export default ShopCategories;
