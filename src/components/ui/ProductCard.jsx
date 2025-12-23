import {image1} from "../../utils/constants.js";
import {HeartIcon, ShoppingCart} from "lucide-react";
import Button from "../../components/ui/Button.jsx";

function ProductCard() {
    return (
        <div className={`product-card flex flex-col max-w-72 gap-3`}>
            <div className={`card-img rounded-sm relative overflow-hidden group`}>
                <img src={image1} alt={`product image`}/>
                <div className={`absolute -bottom-15 opacity-50 group-hover:opacity-100 group-hover:bottom-3 left-0 right-0 flex justify-between items-center transition-all duration-500 ease-in-out px-2`}>


                    <Button size={'sm'} className={"w-fit"}>Add to cart
                        <span><ShoppingCart/></span>
                    </Button>

                <HeartIcon
                   // fill={`#FF0000`}
                   // strokeWidth={1}
                    className={`cursor-pointer`}
                />
                </div>
            </div>
            <div className={`card-details flex justify-between items-center px-1 mb-2`}>
                <h4 className={`capitalize font-medium`}>lorem ipsum dollor</h4>
                <span className={`bg-brand-gray-secondary text-sm px-2.5 py-1 rounded-xl font-medium`}>$44</span>
            </div>
        </div>
    )
}

export default ProductCard;
