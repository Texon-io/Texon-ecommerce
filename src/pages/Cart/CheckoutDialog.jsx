import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonShadcn } from "@/components/ui/button-shadcn";
import Button from "@/components/ui/Button";
import { Input as ShadInput } from "@/components/ui/input-shadcn";

import { Label } from "@/components/ui/label";

export default function CheckoutDialog({ onClose }) {
  return (
    <Dialog>
      <DialogTrigger asChild onClose={onClose}>
        <Button className="w-full mt-3">Checkout</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <form className="space-y-5">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>First Name</Label>
              <ShadInput placeholder="Ramez" />
            </div>
            <div className="space-y-1">
              <Label>Last Name</Label>
              <ShadInput placeholder="Khaled" />
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-1">
            <Label>Mobile Phone</Label>
            <ShadInput placeholder="+20 1xxxxxxxxx" />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label>Address</Label>
            <ShadInput placeholder="Street, City, Country" />
          </div>

          {/* Promo Code */}
          <div className="flex items-center gap-2">
            <ShadInput placeholder="Promo code" className="self-center" />
            <ButtonShadcn
              variant="outline"
              className="text-xs self-center h-fit py-2 cursor-pointer bg-brand-main-trans"
            >
              Apply
            </ButtonShadcn>
          </div>

          {/* Actions */}
          <Button className="w-full">Proceed Order</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
