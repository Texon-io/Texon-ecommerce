import Button from "@/components/ui/Button";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";

export function CartItem({ item }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 rounded-xl border border-border p-4">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="h-52 sm:h-38 w-full sm:w-38 rounded-lg object-cover border"
      />

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-2">
        {/* Title + Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-medium">{item.title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
            <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium">
              <span
                className="h-3 w-3 rounded-full border border-border inline-block shadow-sm"
                style={{ backgroundColor: item.color.toLowerCase() }}
              />
              {item.color}
            </span>
          </div>

          {/* Price */}
          <p className="text-lg sm:text-xl pb-2 font-bold text-brand-main2 self-end sm:self-auto">
            ${item.price}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-row flex-wrap items-center justify-between gap-4 ">
          {/* Left actions */}
          <div className="flex flex-wrap items-center gap-2 ">
            <Button variant="outline" size="sm" className="rounded-lg  py-2 ">
              <Heart size={16} />
            </Button>

            <Button variant="outline" size="sm" className="rounded-lg py-2">
              <Trash2 size={16} />
            </Button>
          </div>

          {/* Quantity */}
          <div className="flex items-center self-start sm:self-auto gap-2 rounded-lg border">
            <button className="cursor-pointer px-3 py-2 rounded-l-lg hover:bg-brand-main-trans transition">
              <Minus size={16} />
            </button>

            <span className="min-w-[32px] text-center text-lg font-medium">
              {item.qty}
            </span>

            <button className="cursor-pointer px-3 py-2 rounded-r-lg hover:bg-brand-main-trans transition">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
