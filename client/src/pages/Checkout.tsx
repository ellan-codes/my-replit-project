import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/lib/cart";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  parentName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  theme: z.string().optional(),
  dietaryNotes: z.string().optional(),
  notes: z.string().optional(),
});

export default function Checkout() {
  const { items, totalEstimatedMin, totalEstimatedMax, clearCart } = useCart();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      date: "",
      startTime: "",
      address: "",
      theme: "",
      dietaryNotes: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: values,
          cart: items,
          totalEstimate: totalEstimatedMin === totalEstimatedMax 
            ? `$${totalEstimatedMin}` 
            : `$${totalEstimatedMin} - $${totalEstimatedMax}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
    } catch (err: any) {
      toast({
        title: "Oops!",
        description: err.message || "Failed to send your booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-lg text-center border-4 border-primary/20"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Woohoo!</h1>
          <p className="text-xl text-gray-700 font-medium mb-6">
            Your party request is in!
          </p>
          <p className="text-muted-foreground mb-8">
            We've received your details and will email you back shortly to confirm everything. Get ready to sparkle!
          </p>
          <Button 
            onClick={() => setLocation("/")}
            className="w-full py-6 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-white"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => setLocation("/")}>Go back shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-primary mb-8 text-center">
          Checkout & Request Booking
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1 space-y-6 order-2 md:order-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border sticky top-24">
              <h3 className="font-bold text-xl mb-4">Order Summary</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pb-4 border-b border-dashed last:border-0">
                    <p className="font-bold text-sm">{item.packageName}</p>
                    <p className="text-xs text-muted-foreground">
                      Size: {item.cateringSize} | {item.hours} hrs
                    </p>
                    {item.isEntertainmentAddOn && (
                      <p className="text-xs text-secondary font-bold">+ Entertainment ($25)</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t-2 border-primary/10">
                <p className="text-sm text-muted-foreground">Estimated Total</p>
                <p className="text-2xl font-bold text-primary">
                  ${totalEstimatedMin === totalEstimatedMax ? totalEstimatedMin : `${totalEstimatedMin} – ${totalEstimatedMax}`}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 555-5555" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Party Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time (Optional)</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Party Location / Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Party Lane, Encinitas, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Taylor Swift, Soccer, Mermaids..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Notes / Allergies</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Peanut allergy, gluten free, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests / Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Anything else we should know?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg mt-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending Request...
                      </>
                    ) : (
                      "Request Booking"
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    *No payment taken today. We'll email you to confirm details.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
