import { heroImg } from "../../utils/constants.js";

function Hero() {
  return (
    <section className={`w-full py-2`}>
      <div className={`flex flex-col h-full gap-5`}>
        {/* Hero Text */}
        <div className={`flex-center flex-col gap-4 min-h-1/2`}>
          <p className={`uppercase text-md font-medium`}>Furniture Store</p>
          <h2
            className={`capitalize text-3xl sm:text-4xl px-6 md:px-24 lg:px-52 font-semibold text-center sm:leading-12 tracking-wide`}
          >
            Discover the Artistry of Modern Contemporary Furniture
          </h2>
          <p
            className={`text-center text-sm font-light px-6 md:px-20 lg:px-40`}
          >
            Experience the elegance and functionality of cutting-edge design
            where luxury meets innovation in every piece for ultimate relaxation
          </p>
        </div>
        {/* Hero Image */}
        <div
          className={`my-2 w-full pb-5 px-0 rounded-sm h-88 flex-col justify-center`}
        >
          <img
            className={`w-full rounded-sm h-full`}
            src={heroImg}
            alt={`hero-img-Sofa-product`}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
