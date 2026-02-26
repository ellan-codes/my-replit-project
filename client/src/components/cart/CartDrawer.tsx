import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart, PACKAGES, CateringSize } from "@/lib/cart";
import { Trash2, ArrowRight, Pencil, Check, X } from "lucide-react";
import { Link } from "wouter";

function EditableCartItem({
  item,
  onSave,
  onCancel,
}: {
  item: ReturnType<typeof useCart>["items"][0];
  onSave: (updates: Partial<typeof item>) => void;
  onCancel: () => void;
}) {
  const [packageId, setPackageId] = useState(item.packageId);
  const [cateringSize, setCateringSize] = useState<CateringSize>(item.cateringSize);
  const [hours, setHours] = useState(item.hours);

  const selectedPkg = PACKAGES.find((p) => p.id === packageId)!;
  const hourlyRate = selectedPkg.prices[cateringSize];
  const hasEntertainmentIncluded = selectedPkg.hasEntertainmentIncluded;
  const isEntertainmentAddOn = !hasEntertainmentIncluded && item.isEntertainmentAddOn;
  const hasEntertainment = hasEntertainmentIncluded || isEntertainmentAddOn;
  const estimatedCost = hourlyRate * hours + (isEntertainmentAddOn ? 25 : 0);

  const guestMap: Record<CateringSize, number> = { Small: 10, Medium: 20, Large: 30 };

  const handleSave = () => {
    onSave({
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      minHourly: selectedPkg.minHourly,
      maxHourly: selectedPkg.maxHourly,
      hourlyRate,
      cateringSize,
      guestCount: guestMap[cateringSize],
      hasEntertainment,
      isEntertainmentAddOn,
      hours,
    });
  };

  return (
    <div className="rounded-xl p-4 border-2 border-primary/30 space-y-3 relative z-10 shadow-md" style={{ backgroundColor: '#ffffff' }}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm text-primary">Editing</span>
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            data-testid="button-save-edit"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            data-testid="button-cancel-edit"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Package</label>
        <Select value={packageId} onValueChange={setPackageId}>
          <SelectTrigger className="bg-white border-gray-200" data-testid="select-package" style={{ backgroundColor: '#ffffff' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PACKAGES.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.name} ({pkg.priceRange}/hr)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Catering Size</label>
        <Select value={cateringSize} onValueChange={(v) => setCateringSize(v as CateringSize)}>
          <SelectTrigger className="bg-white border-gray-200" data-testid="select-catering-size" style={{ backgroundColor: '#ffffff' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Small">Small (~10 guests) — ${selectedPkg.prices.Small}/hr</SelectItem>
            <SelectItem value="Medium">Medium (~20 guests) — ${selectedPkg.prices.Medium}/hr</SelectItem>
            <SelectItem value="Large">Large (~30 guests) — ${selectedPkg.prices.Large}/hr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Hours</label>
        <Select value={String(hours)} onValueChange={(v) => setHours(Number(v))}>
          <SelectTrigger className="bg-white border-gray-200" data-testid="select-hours" style={{ backgroundColor: '#ffffff' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4].map((h) => (
              <SelectItem key={h} value={String(h)}>
                {h} hour{h > 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2 border-t border-primary/20 font-bold text-primary text-sm">
        New Est: ${estimatedCost}
      </div>
    </div>
  );
}

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, removeItem, updateItem, totalEstimatedMin, totalEstimatedMax } = useCart();
  const [editingId, setEditingId] = useState<string | null>(null);

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
              {items.map((item) =>
                editingId === item.id ? (
                  <EditableCartItem
                    key={item.id}
                    item={item}
                    onSave={(updates) => {
                      updateItem(item.id, updates);
                      setEditingId(null);
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div
                    key={item.id}
                    className="bg-secondary/5 rounded-xl p-4 border border-secondary/20 relative"
                  >
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`button-edit-${item.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        data-testid={`button-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-lg text-foreground pr-16">
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
                )
              )}
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
