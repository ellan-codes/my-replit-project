import { useState } from "react";
import { PACKAGES, Package, useCart, CateringSize } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            Party Packages
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect level of sparkle for your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${
                pkg.isPopular
                  ? "border-accent bg-accent/5 shadow-lg scale-105 z-10"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {pkg.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {pkg.name}
              </h3>
              <div className="text-2xl font-bold text-primary mb-4">
                {pkg.priceRange}
                <span className="text-sm font-normal text-muted-foreground">
                  /hr
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setSelectedPackage(pkg)}
                className={`w-full rounded-xl py-6 font-bold text-lg ${
                  pkg.isPopular
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                }`}
              >
                Customize & Add
              </Button>
            </div>
          ))}
        </div>
      </div>

      <CustomizeModal
        pkg={selectedPackage}
        open={!!selectedPackage}
        onOpenChange={(open) => !open && setSelectedPackage(null)}
      />
    </section>
  );
}

function CustomizeModal({
  pkg,
  open,
  onOpenChange,
}: {
  pkg: Package | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addItem } = useCart();
  const [cateringSize, setCateringSize] = useState<CateringSize>("Medium");
  const [guestCount, setGuestCount] = useState<string>("10");
  const [addEntertainment, setAddEntertainment] = useState(false);
  const [hours, setHours] = useState(2);

  if (!pkg) return null;

  const handleAddToCart = () => {
    addItem({
      packageId: pkg.id,
      packageName: pkg.name,
      minHourly: pkg.minHourly,
      maxHourly: pkg.maxHourly,
      cateringSize,
      guestCount: parseInt(guestCount) || 0,
      hasEntertainment: pkg.hasEntertainmentIncluded || addEntertainment,
      isEntertainmentAddOn: !pkg.hasEntertainmentIncluded && addEntertainment,
      hours,
    });
    onOpenChange(false);
    // Reset state defaults for next time
    setCateringSize("Medium");
    setGuestCount("10");
    setAddEntertainment(false);
    setHours(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">
            Customize {pkg.name}
          </DialogTitle>
          <DialogDescription>
            Tailor the package to fit your party size perfectly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Catering Size */}
          <div className="space-y-3">
            <Label className="text-base font-bold">Select Catering Size</Label>
            <RadioGroup
              value={cateringSize}
              onValueChange={(v) => setCateringSize(v as CateringSize)}
              className="grid grid-cols-3 gap-2"
            >
              {[
                { val: "Small", desc: "Few kids + parents" },
                { val: "Medium", desc: "Solid party crew" },
                { val: "Large", desc: "Big celebration" },
              ].map((opt) => (
                <div key={opt.val}>
                  <RadioGroupItem
                    value={opt.val}
                    id={`size-${opt.val}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`size-${opt.val}`}
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-3 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                  >
                    <span className="font-bold">{opt.val}</span>
                    <span className="text-[10px] text-muted-foreground text-center mt-1">
                      {opt.desc}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Guest Count */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guests" className="font-bold">
                Est. Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="rounded-lg border-2 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours" className="font-bold">
                Hours (Max 4)
              </Label>
              <Input
                id="hours"
                type="number"
                min="1"
                max="4"
                value={hours}
                onChange={(e) => setHours(Math.min(parseInt(e.target.value) || 1, 4))}
                className="rounded-lg border-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Entertainment Option */}
          <div className="space-y-3 p-4 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-bold flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-accent" /> Entertainment
              </Label>
            </div>
            {pkg.hasEntertainmentIncluded ? (
              <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 p-2 rounded-lg">
                <Check className="w-4 h-4" /> Included in package!
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="entertainment"
                  checked={addEntertainment}
                  onCheckedChange={(c) => setAddEntertainment(!!c)}
                  className="rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="entertainment"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Add Entertainment (+$25 one-time fee)
                </Label>
              </div>
            )}
            {!pkg.hasEntertainmentIncluded && (
              <p className="text-xs text-muted-foreground pl-6">
                Includes games host, mini dance/cheer, or party helper.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddToCart}
            className="w-full rounded-xl py-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg"
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
