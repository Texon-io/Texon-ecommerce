import {categoriesStore} from "@/pages/Products/categoriesStore.js";


function ShopIntro() {
    const {category} = categoriesStore()

    return (
        <div className={`flex flex-col gap-3`}>

            <h3 className={`text-4xl font-semibold text-center capitalize transition-all`}>{ category === "All" ? "House" :category}</h3>
            <p className={`text-center text-sm font-light px-6 md:px-20 lg:px-40`}>Transform your { category === "All" ? "House" :category} with our
                elegant and functional seating options, perfect for every modern home.</p>
        </div>
    )
}

export default ShopIntro;
