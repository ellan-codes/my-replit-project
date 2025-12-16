import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import gallery1 from "@assets/generated_images/real_backyard_party_table_iphone_photo.png";
import gallery2 from "@assets/generated_images/homemade_cupcakes_on_counter.png";
import gallery3 from "@assets/generated_images/kids_playing_tag_backyard.png";
import gallery5 from "@assets/generated_images/handmade_paper_goodie_bags.png";
import gallery6 from "@assets/generated_images/kids_messy_craft_table.png";
import gallery7 from "@assets/generated_images/kids_dress_up_trunk.png";
import gallery8 from "@assets/generated_images/cute_party_invitations.png";
import gallery9 from "@assets/generated_images/party_music_setup.png";
import gallery4_new from "@assets/generated_images/colorful_balloon_garland.png"; // Replacement for decor

const images = [
  { 
    src: gallery1, 
    caption: "Sparkly setups",
    description: "We create magical atmospheres for any theme! Here are some of our favorite setups:",
    details: [
      "Pink & Gold Princess Table",
      "Mermaid Under the Sea",
      "Rainbow Brights",
      "Garden Tea Party",
      "Super Hero Cityscape"
    ]
  },
  { 
    src: gallery2, 
    caption: "Kid-approved treats",
    description: "Yummy snacks that look as good as they taste! We can provide:",
    details: [
      "Sparkle Cupcakes with Sprinkles",
      "Fresh Fruit Wands",
      "Popcorn Cones",
      "Chocolate Dipped Pretzels",
      "Custom Juice Box Wraps",
      "Mini Sandwiches"
    ]
  },
  { 
    src: gallery3, 
    caption: "Fun games & activities",
    description: "Keep the energy high with our organized games and activities:",
    details: [
      "Classic Potato Sack Race",
      "Musical Chairs with Fun Music",
      "Pin the Horn on the Unicorn",
      "Backyard Scavenger Hunt",
      "Bubble Station",
      "Freeze Dance"
    ]
  },
  { 
    src: gallery4_new, 
    caption: "Decor that pops",
    description: "Simple yet effective decorations to transform your space:",
    details: [
      "Colorful Balloon Arches",
      "Crepe Paper Streamer Backdrops",
      "Confetti Cannons",
      "Personalized Birthday Banners",
      "Themed Table Centerpieces"
    ]
  },
  { 
    src: gallery5, 
    caption: "Cute party favors",
    description: "Send guests home with a smile and a special little bag:",
    details: [
      "Themed Sticker Sheets",
      "Mini Slime Jars",
      "Candy & Treat Bags",
      "Fun Shaped Sunglasses",
      "DIY Friendship Bracelets",
      "Coloring Pages"
    ]
  },
  { 
    src: gallery6, 
    caption: "Entertainment props",
    description: "Props and tools we use to make the party interactive:",
    details: [
      "Dress-up Chest (Capes, Tiaras)",
      "Silly Photo Booth Props",
      "Karaoke Microphone",
      "Simple Face Painting Kit",
      "Party Hats & Noise Makers"
    ]
  },
  {
    src: gallery7,
    caption: "Dress-Up Corner",
    description: "Let their imaginations run wild with our dress-up trunk:",
    details: [
      "Sparkly Capes & Masks",
      "Feather Boas",
      "Princess Tiaras",
      "Funny Hats",
      "Foam Swords & Shields"
    ]
  },
  {
    src: gallery8,
    caption: "Custom Invitations",
    description: "Start the excitement early with beautiful invites:",
    details: [
      "Digital or Printed",
      "Custom Themed Designs",
      "RSVP Tracking Help",
      "Matching Thank You Cards"
    ]
  },
  {
    src: gallery9,
    caption: "Party Jams",
    description: "We bring the tunes to keep everyone dancing:",
    details: [
      "Kid-Friendly Playlists",
      "Bluetooth Speaker Setup",
      "Mini Disco Lights",
      "Dance Party Games",
      "Request Your Favorites!"
    ]
  }
];

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState<typeof images[0] | null>(null);

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            Party Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            Tap any image to see what's included!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedItem(img)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-bold font-display tracking-wide text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption} <span className="text-sm font-normal block opacity-80">Tap to view list</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl overflow-hidden p-0">
          <div className="relative h-48 w-full">
            <img 
              src={selectedItem?.src} 
              alt={selectedItem?.caption} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <DialogTitle className="text-white text-3xl font-display font-bold">
                {selectedItem?.caption}
              </DialogTitle>
            </div>
          </div>
          
          <div className="p-6">
            <DialogDescription className="text-base text-foreground mb-4 font-medium">
              {selectedItem?.description}
            </DialogDescription>
            
            <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-muted/20">
              <ul className="space-y-3">
                {selectedItem?.details.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm md:text-base">
                    <span className="h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
