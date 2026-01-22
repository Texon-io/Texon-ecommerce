import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ButtonShadcn } from "@/components/ui/button-shadcn";
import { Input as ShadInput } from "@/components/ui/input-shadcn";
import { Label } from "@/components/ui/label";
import { PlusCircle, ImagePlus, X } from "lucide-react";
import CustomSelect from "./CustomSelect";

const categories = [
  { id: "all", label: "All" },
  { id: "accessories", label: "Accessories" },
  { id: "bedroom", label: "Bedroom" },
  { id: "chairs", label: "Chairs" },
  { id: "kitchen", label: "Kitchen" },
  { id: "sitting_room", label: "Sitting Room" },
];

export default function AddProductDialog({ open, setOpen }) {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleImageAdd = () => {
    const url = prompt("Enter image URL (for now):");
    if (url) setImages([...images, url]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6 pt-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="title">Product Title</Label>
            <ShadInput
              id="title"
              placeholder="e.g. Modern Leather Sofa"
              className="focus:ring-[#7C71DF] focus:border-[#7C71DF]"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="desc">Description</Label>

            <textarea
              id="desc"
              placeholder="Tell customers more about the product..."
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none focus:ring-[#7C71DF] focus:border-[#7C71DF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left ">
            <div className="space-y-2">
              <Label htmlFor="add-product-category">Category</Label>
              <CustomSelect
                id={`add-product-category`}
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                options={categories}
                placeholder="Filter by Category"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <ShadInput
                id="price"
                className="py-4.5 focus:ring-[#7C71DF] focus:border-[#7C71DF]"
                type="number"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <ShadInput
                id="stock"
                className="py-4.5 focus:ring-[#7C71DF] focus:border-[#7C71DF]"
                type="number"
                placeholder="10"
                required
              />
            </div>
          </div>

          <div className="space-y-3 text-left">
            <Label>Product Images</Label>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden border shadow-sm"
                >
                  <img
                    src={img}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-md"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleImageAdd}
                className="aspect-square  cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-gray-400 hover:text-brand-main hover:border-brand-main transition bg-gray-50/50 hover:bg-gray-50"
              >
                <ImagePlus size={24} />
                <span className="text-[10px] mt-1 font-medium">Add Image</span>
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <ButtonShadcn
              variant="outline"
              className="flex-1  cursor-pointer"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </ButtonShadcn>
            <ButtonShadcn className="flex-1 bg-brand-main text-white hover:bg-brand-main/90 transition-colors">
              Save Product
            </ButtonShadcn>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
