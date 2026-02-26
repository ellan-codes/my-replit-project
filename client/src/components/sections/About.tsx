import { MapPin, Mail, Phone } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-display font-bold text-primary">
              Meet the Founders
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a teen-run business based in Encinitas, passionate about making parties fun for kids and easy for parents.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="text-xl font-bold text-secondary mb-2">Becca Marie Kennedy</h3>
                <p className="text-sm text-muted-foreground mb-3">Co-Founder, 13 years old</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>✨ 8th Grade student</li>
                  <li>🥊 Loves decorating, cooking, & boxing</li>
                  <li>🎨 Creative & organized</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="text-xl font-bold text-secondary mb-2">Ella Porter</h3>
                <p className="text-sm text-muted-foreground mb-3">Co-Founder, 13 years old</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>✨ 8th Grade student</li>
                  <li>🎀 Loves tumbling & cheerleading</li>
                  <li>💖 Favorite color: Pink</li>
                  <li>🎨 Creative & organized</li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/10 p-6 rounded-2xl mt-8 border border-accent/20">
              <h4 className="font-bold text-accent-foreground mb-2">Our Mission</h4>
              <p className="text-sm text-foreground/80">
                This business started as a class project for Village Gate. All proceeds support our class party and help us learn how to run a business and build independence!
              </p>
            </div>
          </div>

          <div className="relative">
             {/* Placeholder for founders photo - using a nice illustration style or just text block if no image available */}
             <div className="aspect-[4/3] rounded-3xl bg-secondary/10 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <p className="relative z-10 text-white font-display text-3xl font-bold text-center px-4">
                  "We make parties sparkle!"
                </p>
             </div>
             
             {/* Decorative blob */}
             <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
             <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a question or custom request? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center">
              <Mail />
            </div>
            <h3 className="font-bold">Email Us</h3>
            <p className="text-muted-foreground text-sm">ellangellpo@gmail.com</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center">
              <Phone />
            </div>
            <h3 className="font-bold">Call Us</h3>
            <p className="text-muted-foreground text-sm">442-369-0593</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
              <MapPin />
            </div>
            <h3 className="font-bold">Location</h3>
            <p className="text-muted-foreground text-sm">Encinitas, CA</p>
          </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-lg font-medium text-primary">
             Ready to book? <a href="#packages" className="underline hover:text-secondary">Check out our packages</a> or fill out the form at checkout!
           </p>
        </div>
      </div>
    </section>
  );
}
