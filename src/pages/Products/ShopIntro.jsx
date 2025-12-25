import Input from "../../components/ui/Input.jsx";


function ShopIntro() {
    return (
        <div className={`flex flex-col gap-3`}>

            <h3 className={`text-4xl font-semibold text-center`}>Sitting Room</h3>
            <p className={`text-center text-sm font-light px-6 md:px-20 lg:px-40`}>Transform your sitting room with our
                elegant and functional seating options, perfect for every modern home.</p>
            <div className={`w-1/2 mx-auto`}>
                <Input placeholder={`Search`}/>
            </div>
        </div>
    )
}

export default ShopIntro;
