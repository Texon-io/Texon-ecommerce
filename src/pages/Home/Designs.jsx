import SectionHeading from "../../components/ui/SectionHeading.jsx";
import {
    GalleryImage1, GalleryImage2, GalleryImage3, GalleryImage4,
    GalleryImage5,
    GalleryImage6,
    GalleryImage7,
    GalleryImage8,
    GalleryImage9
} from "../../utils/constants.js";


const gallery = [
    GalleryImage1,
    GalleryImage2,
    GalleryImage3,
    GalleryImage4,
    GalleryImage5,
    GalleryImage6,
    GalleryImage7,
    GalleryImage8,
    GalleryImage9,
]

function Designs() {
    return (
        <section className="pt-12 w-full">
            <SectionHeading className={`tracking-wider`}>Design inspiration and modern home ideas</SectionHeading>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 auto-rows-[175px] sm:auto-rows-[250px] ">
                <img src={gallery[0]} className="w-full h-full object-cover rounded-lg row-span-2" />
                <img src={gallery[1]} className="w-full h-full object-cover rounded-lg" />
                <img src={gallery[2]} className="w-full h-full object-cover rounded-lg row-span-2" />

                <img src={gallery[3]} className="w-full h-full object-cover rounded-lg row-span-2" />
                <img src={gallery[4]} className="w-full h-full object-cover rounded-lg row-span-2" />

                <img src={gallery[5]} className="w-full h-full object-cover rounded-lg row-span-2" />
                <img src={gallery[6]} className="w-full h-full object-cover rounded-lg row-span-2" />
                <img src={gallery[7]} className="w-full h-full object-cover rounded-lg" />

                <img src={gallery[8]} className="w-full h-full object-cover rounded-lg max-sm:hidden" />
            </div>
        </section>
    )
}

export default Designs;
