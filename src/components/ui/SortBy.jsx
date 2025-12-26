import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import { useSortProducts } from "@/pages/Products/sortProducts.js";

function SortBy() {
    const { sortMethod, setSortMethod } = useSortProducts();

    return (
        <div className="relative mb-4">
            <Select value={sortMethod} onValueChange={setSortMethod}>
                <SelectTrigger className="outline-brand-main min-w-48">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest-first">Newest</SelectItem>
                    <SelectItem value="oldest-first">Oldest</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default SortBy;