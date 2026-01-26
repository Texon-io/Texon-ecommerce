import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../../utils/constants.js";
import Button from "../../components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import { featuredBlog } from "./Blog.jsx";

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    let blog = blogs.find((b) => b.id === id);

    if (!blog) blog = featuredBlog

    if (!blog) {
        return <div className="p-20 text-center text-2xl font-bold">Blog not found!</div>;
    }

    return (
        <div className="max-w-6xl mx-auto pt-12 p-6 min-h-screen bg-white">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-10 hover:bg-gray-100 transition-colors"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Blogs
            </Button>

            {/* Main Container: Flexbox for side-by-side layout */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">

                {/* Left Side: Image Container */}
                <div className="w-full lg:w-1/2 sticky top-8">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                            imageRendering: 'smooth',
                            objectPosition: 'center'
                        }}
                        className="w-full h-[300px] lg:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                    />
                </div>

                {/* Right Side: Content Container */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <span className="inline-block px-4 py-1 bg-brand-main text-white rounded-full text-xs font-bold uppercase tracking-wider">
                        {blog.label}
                    </span>

                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-xl text-gray-500 italic border-l-4 border-brand-main pl-4">
                        {blog.description}
                    </p>

                    <div className="text-lg leading-relaxed text-gray-700 space-y-4">
                        {/* We split content by new lines if you want paragraphs */}
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}