import {useNavigate} from "react-router";
import { MoveRight } from "lucide-react";

import { categ01, categ02, categ03, categ04 } from "../../utils/constants.js";
import SectionHeading from "../../components/ui/SectionHeading.jsx";
import Button from "../../components/ui/Button.jsx";
import {categoriesStore} from "@/pages/Products/categoriesStore.js";

function Categories() {
    const navigate = useNavigate()
    const {setCategory}=  categoriesStore()

    function handleClick(val){
        setCategory(val);
        navigate("/products")
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

  return (
    <section className="pt-14 w-full">
      <SectionHeading>Categories</SectionHeading>

      <div className={`flex flex-col w-full gap-6`}>
        {/* Sitting Room - Full width always */}
        <div className="bg-gray-100 rounded-md overflow-hidden flex flex-col md:flex-row justify-between">
          <div className="p-8 md:w-1/3 md:p-6 flex flex-col items-start justify-center gap-3">
            <p className="capitalize text-2xl md:text-4xl font-medium">
              Sitting Room
            </p>
            <Button variant="outline" onClick={() => handleClick("Sitting Room")}>
              Shop now
              <MoveRight strokeWidth={1} />
            </Button>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <img
              src={categ01}
              loading={"lazy"}
              alt="Sitting room furniture"
              className="w-full md:w-4/5 h-64 md:h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accessories - Half on desktop, full on mobile */}
          <div className="bg-gray-100 rounded-md overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 md:p-6 flex flex-col items-start justify-center gap-3">
              <p className="capitalize text-2xl md:text-4xl font-medium">
                Accessories
              </p>
              <Button variant="outline" onClick={() => handleClick("Accessories")}>
                Shop now
                <MoveRight strokeWidth={1} />
              </Button>
            </div>
            <div className="flex justify-center md:justify-end items-center">
              <img
                src={categ02}
                loading={"lazy"}
                alt="Home accessories"
                className="w-full md:w-4/5 h-fit md:h-full object-cover"
              />
            </div>
          </div>

          {/* Kitchen - Half on desktop, full on mobile */}
          <div className="bg-gray-100 rounded-md overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2 md:p-6 flex flex-col items-start justify-center gap-3">
              <p className="capitalize text-2xl md:text-4xl font-medium">
                Kitchen
              </p>
              <Button variant="outline" onClick={() => handleClick("Kitchen")}>
                Shop now
                <MoveRight className="ml-2" strokeWidth={1} />
              </Button>
            </div>
            <div className="flex justify-center md:justify-end items-center">
              <img
                src={categ03}
                loading={"lazy"}
                alt="Modern kitchen furniture"
                className="w-full md:w-4/5 h-fit md:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bedroom - Full width always */}
        <div className="bg-gray-100 rounded-md overflow-hidden flex flex-col md:flex-row justify-between">
          <div className="p-8 md:w-1/3 md:p-6 flex flex-col items-start justify-center gap-3">
            <p className="capitalize text-2xl md:text-4xl font-medium">
              Bedroom
            </p>
            <Button variant="outline"  onClick={() => handleClick("Bedroom")}>
              Shop now
              <MoveRight className="ml-2" strokeWidth={1} />
            </Button>
          </div>
          <div className="flex justify-center md:justify-end items-center mr-0">
            <img
              src={categ04}
              loading={"lazy"}
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
