import SectionHeading from "@/components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import { ArrowRightIcon } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogMain, blogs } from "../../utils/constants"
import { Link } from "react-router";

export const featuredBlog = {
    id: "modern-furniture-trends-2026",
    image: blogMain, // Use a high-res version here
    title: "Transforming Your Living Space: Top Trends in Modern Furniture",
    description: "Explore the latest trends in modern furniture design that can elevate your living space with style and functionality.",
    content: `Modern furniture in 2026 is all about blending raw nature with high-tech functionality. 
    From modular sofas that rearrange themselves to sustainable oak dining tables, the focus is on personal expression. 
    Interior designers are moving away from cold industrialism toward 'Warm Minimalism'—using textures like boucle, velvet, and reclaimed wood to create spaces that feel cozy yet sophisticated.`,
    label: "Trends 2026"
};

export default function Blog() {

    return (
        <div className={`w-full pt-12`}>
            <div className="blog-intro mb-8 space-y-8">
                <h3 className={`text-4xl font-semibold text-left capitalize transition-all`}>{featuredBlog.title}</h3>
                <p className={`text-sm text-left transition-all my-6 text-brand-gray`}>{featuredBlog.description}</p>

                <Link to={`/blog/${featuredBlog.id}`}>
                    <Button variant="outline">Read more <ArrowRightIcon className="w-4 h-4 ml-2" /></Button>
                </Link>
                <div className="h-96 mt-6">
                    <img src={featuredBlog.image} alt="" className="h-full w-[105%] object-cover rounded-lg" />
                </div>
            </div>

            <SectionHeading>Latest Articles</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 my-10">                {blogs.map(blog => (
                <BlogCard blog={blog} key={blog.title} />
            ))}
            </div>
        </div>
    )
}
