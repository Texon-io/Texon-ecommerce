import SectionHeading from "../../components/ui/SectionHeading.jsx";
import { categ01, categ02, categ03, categ04 } from "../../utils/constants.js";
import Button from "../../components/ui/Button.jsx";
import { MoveRight } from "lucide-react";

function Categories() {
    return (
        <section className="pt-12 w-full">
            <SectionHeading>Categories</SectionHeading>

            <div className={`flex flex-col w-full gap-6`}>
                {/* Sitting Room - Full width always */}
                <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row justify-between">
                    <div className="p-8 md:w-1/3 md:p-6 flex flex-col items-start justify-center gap-3">
                        <p className="capitalize text-2xl md:text-4xl font-medium">Sitting Room</p>
                        <Button variant="outline">
                            Shop now
                            <MoveRight strokeWidth={1} />
                        </Button>
                    </div>
                    <div className="flex justify-center md:justify-end items-center">
                        <img
                            src={categ01}
                            lazy={'loading'}
                            alt="Sitting room furniture"
                            className="w-full md:w-4/5 h-64 md:h-full object-cover"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Accessories - Half on desktop, full on mobile */}
                    <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="p-8 md:w-1/2 md:p-6 flex flex-col items-start justify-center gap-3">
                            <p className="capitalize text-2xl md:text-4xl font-medium">Accessories</p>
                            <Button variant="outline">
                                Shop now
                                <MoveRight strokeWidth={1} />
                            </Button>
                        </div>
                        <div className="flex justify-center md:justify-end items-center">
                            <img
                                src={categ02}
                                lazy={'loading'}
                                alt="Home accessories"
                                className="w-full md:w-4/5 h-fit md:h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Kitchen - Half on desktop, full on mobile */}
                    <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="p-8 md:w-1/2 md:p-6 flex flex-col items-start justify-center gap-3">
                            <p className="capitalize text-2xl md:text-4xl font-medium">Kitchen</p>
                            <Button variant="outline">
                                Shop now
                                <MoveRight className="ml-2" strokeWidth={1} />
                            </Button>
                        </div>
                        <div className="flex justify-center md:justify-end items-center">
                            <img
                                src={categ03}
                                lazy={'loading'}
                                alt="Modern kitchen furniture"
                                className="w-full md:w-4/5 h-fit md:h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Bedroom - Full width always */}
                <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row justify-between">
                    <div className="p-8 md:w-1/3 md:p-6 flex flex-col items-start justify-center gap-3">
                        <p className="capitalize text-2xl md:text-4xl font-medium">Bedroom</p>
                        <Button variant="outline">
                            Shop now
                            <MoveRight className="ml-2" strokeWidth={1} />
                        </Button>
                    </div>
                    <div className="flex justify-center md:justify-end items-center mr-0">
                        <img
                            src={categ04}
                            lazy={'loading'}
                            alt="Luxury bedroom furniture"
                            className="w-full md:w-4/5 h-fit md:h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Categories;