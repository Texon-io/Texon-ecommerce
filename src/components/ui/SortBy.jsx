import { ChevronDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select"


function SortBy({ onChange, value = "" }) {
    return (
        <div className="relative mb-4">
            <Select>
                <SelectTrigger className={`w-[180px] outline-brand-main`}>
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
            </Select>

            <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/70"
                size={20}
            />
        </div>
    );
}

export default SortBy;