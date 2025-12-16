import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/soft_pastel_pink_and_blue_party_background.png";

export function Hero() {
  const scrollToPackages = () => {
    const el = document.getElementById("packages");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Party Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-800 drop-shadow-sm mb-4">
            Prennedy Style
            <br />
            <span className="text-primary/90">Party Planning</span>
          </h1>
          <p className="text-xl md:text-2xl font-body text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
            “Sparkly parties. Delicious food. Stress-free parents.”
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={scrollToPackages}
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:scale-105 transition-transform"
            >
              Shop Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="text-lg px-8 py-6 rounded-full bg-white/90 hover:bg-white text-gray-800 border-2 border-gray-200 shadow-md hover:scale-105 transition-transform"
            >
              Request a Quote
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Catering + Setup", "Kid-friendly entertainment", "Made for busy parents", "Adult Parties"].map(
              (badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur px-6 py-2 rounded-full shadow-sm text-sm md:text-base font-bold text-gray-600 border border-white/60"
                >
                  ✨ {badge}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
