import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type CateringSize = "Small" | "Medium" | "Large";

export type Package = {
  id: string;
  name: string;
  priceRange: string; // e.g., "$100–$200"
  minHourly: number;
  maxHourly: number;
  includes: string[];
  isPopular?: boolean;
  hasEntertainmentIncluded: boolean;
};

export type CartItem = {
  id: string; // unique ID for cart item
  packageId: string;
  packageName: string;
  minHourly: number;
  maxHourly: number;
  cateringSize: CateringSize;
  guestCount: number;
  hasEntertainment: boolean; // True if included or added
  isEntertainmentAddOn: boolean; // True if it was an extra $25 add-on
  hours: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  cartCount: number;
  totalEstimatedMin: number;
  totalEstimatedMax: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const PACKAGES: Package[] = [
  {
    id: "package-a",
    name: "All-Inclusive Premium",
    priceRange: "$100–$200",
    minHourly: 100,
    maxHourly: 200,
    includes: ["Setup", "Catering", "Serving", "Decorating", "Entertainment"],
    isPopular: true,
    hasEntertainmentIncluded: true,
  },
  {
    id: "package-b",
    name: "All-Inclusive",
    priceRange: "$90–$150",
    minHourly: 90,
    maxHourly: 150,
    includes: ["Setup", "Catering", "Serving", "Decorating"],
    hasEntertainmentIncluded: false,
  },
  {
    id: "package-c",
    name: "Bundle Premium",
    priceRange: "$80–$100",
    minHourly: 80,
    maxHourly: 100,
    includes: ["Setup", "Catering", "Serving"],
    hasEntertainmentIncluded: false,
  },
  {
    id: "package-d",
    name: "Bundle",
    priceRange: "$45–$90",
    minHourly: 45,
    maxHourly: 90,
    includes: ["Setup", "Catering"],
    hasEntertainmentIncluded: false,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("prennedy-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("prennedy-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "id">) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    setItems((prev) => [...prev, newItem]);
    toast({
      title: "Added to Cart!",
      description: `${item.packageName} has been added.`,
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("prenndy-cart");
  };

  const cartCount = items.length;

  const totalEstimatedMin = items.reduce((acc, item) => {
    let hourlyRate = item.minHourly;
    if (item.cateringSize === "Medium") {
      hourlyRate = Math.round((item.minHourly + item.maxHourly) / 2);
    } else if (item.cateringSize === "Large") {
      hourlyRate = item.maxHourly;
    }
    
    let cost = hourlyRate * item.hours;
    if (item.isEntertainmentAddOn) cost += 25;
    return acc + cost;
  }, 0);

  const totalEstimatedMax = items.reduce((acc, item) => {
    let hourlyRate = item.maxHourly;
    if (item.cateringSize === "Small") {
      hourlyRate = item.minHourly;
    } else if (item.cateringSize === "Medium") {
      hourlyRate = Math.round((item.minHourly + item.maxHourly) / 2);
    }
    
    let cost = hourlyRate * item.hours;
    if (item.isEntertainmentAddOn) cost += 25;
    return acc + cost;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        cartCount,
        totalEstimatedMin,
        totalEstimatedMax,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
