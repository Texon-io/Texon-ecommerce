import { HeartIcon, ShoppingCart } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import {
  useIsInWishlist,
  useWishlistActions,
} from "@/pages/Wishlist/useWishlist.js";
import { useCartActions } from "@/pages/Cart/useCart.js";
import { handleAddToCart, handleAddToWishlist } from "@/utils/helpers.js";
import { useIsInCart } from "@/pages/Cart/useCart.js";
import { Link } from "react-router";
import {useEffect, useState} from "react";
import {Spinner} from "@/components/ui/spinner.jsx";

function ProductCard({ product }) {

  // NOTE: Check useWishlist file for more details
  const { addToWishlist } = useWishlistActions();
  const { data: isWishlisted } = useIsInWishlist(product.id);
  // NOTE: Check useCart file for more details
  const { addToCart, isAdding } = useCartActions();
  const { data: cartStatus = { isInCart: false } } = useIsInCart(product.id);

    const {isInCart} = cartStatus

  const [isClicked, setIsClicked] = useState(isWishlisted)

    useEffect(() => {
        if (isWishlisted) {
            setIsClicked(true);
        }
    }, [isWishlisted]);


    if (!product) return null;
  const { title, image_url, price, id } = product;



  // for optimistic UI
  function handleClick(){
      setIsClicked(true)
      handleAddToWishlist(isWishlisted, addToWishlist, product)
  }

  return (
    <div
      className={`product-card flex flex-col gap-3 w-full cursor-pointer`}
    >
      <div
        className={`card-img rounded-sm relative overflow-hidden group h-72`}
      >
        <Link to={`/productdetails/${id}`}>
          <img
            loading={`lazy`}
            src={image_url}
            alt={`product image`}
            className={`w-full h-full`}
          />
        </Link>
        <div
          className={`absolute -bottom-15 opacity-50 group-hover:opacity-100 group-hover:bottom-3 left-0 right-0 flex justify-between items-center transition-all duration-500 ease-in-out px-2`}
        >
          <Button
            onClick={() =>
              handleAddToCart(cartStatus.isInCart, addToCart, product)
            }
            disabled={isAdding || isInCart}
            size={"sm"}
            className={"w-fit"}
          >

              {}
              {isAdding ? <Spinner className={`size-6 ml-2`}/> :isInCart ? "Already in cart" : "Add to cart"}
            <span>
              {!isInCart && <ShoppingCart />}
            </span>
          </Button>

          <button
            onClick={handleClick}
          >
            <HeartIcon
              fill={isClicked ? "#FF0000" : "rgba(0,0,0,0)"}
              strokeWidth={isClicked ? 0 :2}
              className={`cursor-pointer`}
            />
          </button>
        </div>
      </div>
      <div
        className={`card-details flex justify-between items-center px-1 mb-2`}
      >
        <h4 className={`capitalize font-medium`}>{title}</h4>
        <span
          className={`bg-brand-gray-secondary text-sm px-2.5 py-1 rounded-xl font-medium`}
        >
          ${price}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
