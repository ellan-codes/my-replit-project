import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Sarah M.",
      text: "Fast setup and super friendly! The kids had an amazing time and I actually got to enjoy the party.",
      role: "Mom of 2",
    },
    {
      name: "Jessica P.",
      text: "Food was a hit—zero stress. The 'All-Inclusive' package was totally worth it. Highly recommend!",
      role: "Parent",
    },
    {
      name: "Emily R.",
      text: "Kids had the best time. The entertainment add-on kept them busy for hours. Thank you Prenndy Style!",
      role: "Mom of 3",
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            Happy Parents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <Card
              key={i}
              className="border-none shadow-lg bg-secondary/5 hover:bg-secondary/10 transition-colors"
            >
              <CardContent className="pt-8 pb-8 px-6 text-center">
                <Quote className="w-10 h-10 text-secondary/30 mx-auto mb-4" />
                <p className="text-lg text-foreground italic mb-6">
                  "{review.text}"
                </p>
                <div>
                  <h4 className="font-bold text-primary">{review.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {review.role}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
