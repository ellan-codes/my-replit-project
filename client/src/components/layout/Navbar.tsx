import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const [location, setLocation] = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/#packages" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Reviews", href: "/#reviews" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      setLocation(href);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-display font-bold text-primary">
            Prennedy Style
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Cart ({cartCount})
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left font-medium py-2 text-foreground hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => {
                setIsOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full rounded-full bg-accent text-accent-foreground"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Cart ({cartCount})
            </Button>
          </div>
        )}
      </nav>
      
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
      
      {/* Floating Cart Button for Mobile (when not in menu) */}
      {!isOpen && !isCartOpen && cartCount > 0 && (
        <Button
          onClick={() => setIsCartOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 rounded-full h-14 w-14 p-0 shadow-xl bg-accent text-accent-foreground animate-bounce"
        >
          <div className="relative">
             <ShoppingBag className="w-6 h-6" />
             <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
               {cartCount}
             </span>
          </div>
        </Button>
      )}
    </>
  );
}
