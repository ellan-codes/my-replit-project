import gallery1 from "@assets/generated_images/diy_backyard_party_table.png";
import gallery2 from "@assets/generated_images/homemade_cupcakes.png";
import gallery3 from "@assets/generated_images/kids_playing_in_backyard.png";
import gallery4 from "@assets/generated_images/simple_balloon_decoration.png";
import gallery5 from "@assets/generated_images/handmade_party_favors.png";
import gallery6 from "@assets/generated_images/simple_kids_craft_activity.png";

const images = [
  { src: gallery1, caption: "Sparkly setups" },
  { src: gallery2, caption: "Kid-approved treats" },
  { src: gallery3, caption: "Fun games & activities" },
  { src: gallery4, caption: "Decor that pops" },
  { src: gallery5, caption: "Cute party favors" },
  { src: gallery6, caption: "Entertainment props" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            Party Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            See the magic we bring to every celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-bold font-display tracking-wide text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
