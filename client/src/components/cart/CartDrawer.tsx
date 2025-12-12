import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart";
import { Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, removeItem, totalEstimatedMin, totalEstimatedMax } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-white">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-primary">
            Your Party Cart
          </SheetTitle>
          <SheetDescription>
            Review your packages before booking.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6 my-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <p>Your cart is empty.</p>
              <Button
                variant="link"
                onClick={() => onOpenChange(false)}
                className="text-primary"
              >
                Go add some sparkle!
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-secondary/5 rounded-xl p-4 border border-secondary/20 relative"
                >
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <h4 className="font-bold text-lg text-foreground pr-6">
                    {item.packageName}
                  </h4>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Size:</span>{" "}
                      {item.cateringSize} ({item.guestCount} guests)
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Duration:</span>{" "}
                      {item.hours} hours
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Entertainment:
                      </span>{" "}
                      {item.hasEntertainment ? "Included" : "None"}
                      {item.isEntertainmentAddOn && " (+$25)"}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-secondary/20 font-bold text-primary">
                    Est: ${
                      item.hourlyRate * item.hours + (item.isEntertainmentAddOn ? 25 : 0)
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="sm:flex-col gap-4">
          <div className="w-full space-y-2 bg-muted/30 p-4 rounded-lg">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Estimate:</span>
              <span className="text-primary">
                ${totalEstimatedMin === totalEstimatedMax ? totalEstimatedMin : `${totalEstimatedMin} – ${totalEstimatedMax}`}
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              *Final price confirmed after booking
            </p>
          </div>
          <Link href="/checkout">
            <Button
              className="w-full rounded-xl py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg"
              disabled={items.length === 0}
              onClick={() => onOpenChange(false)}
            >
              Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
