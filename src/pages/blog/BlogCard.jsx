import { ArrowRightIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import React from 'react'
import { Link } from 'react-router';

export default function BlogCard({ blog }) {
    const { id, image, title, description, label } = blog;
    return (
        <div className="flex flex-col">
            <div className="w-full">
                <img src={image} alt="" className="h-64 w-full object-cover rounded-2xl" />

            </div>
            <div className="py-6 space-y-6">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm text-brand-gray">{description}</p>
                <div className='flex items-center justify-between'>
                    <span className="bg-brand-main/5 py-1 px-6 rounded-full text-base text-brand-main2 font-medium capitalize">{label}</span>
                    <Link to={`/blog/${id}`}>
                        <Button variant="outline">Read more <ArrowRightIcon className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
