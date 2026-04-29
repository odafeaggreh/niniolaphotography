"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form data:", data);
    toast.success("Message sent successfully! I'll get back to you soon.");
    reset();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel htmlFor="name" className="text-white">Name</FieldLabel>
          <FieldContent>
            <Input 
              id="name" 
              {...register("name")} 
              placeholder="John Doe" 
              className="bg-white/5 border-white/10 text-white h-12"
            />
          </FieldContent>
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
          <FieldContent>
            <Input 
              id="email" 
              type="email"
              {...register("email")} 
              placeholder="john@example.com" 
              className="bg-white/5 border-white/10 text-white h-12"
            />
          </FieldContent>
          <FieldError errors={[errors.email]} />
        </Field>
      </div>

      <Field>
        <FieldLabel className="text-white">Service Type</FieldLabel>
        <FieldContent>
          <select 
            {...register("serviceType")}
            className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:border-accent-gold focus:outline-none transition-colors h-12 appearance-none"
          >
            <option value="" className="bg-bg-primary">Select a service</option>
            <option value="Portrait Session" className="bg-bg-primary">Portrait Session</option>
            <option value="Event Coverage" className="bg-bg-primary">Event Coverage</option>
            <option value="Commercial" className="bg-bg-primary">Commercial</option>
            <option value="Other" className="bg-bg-primary">Other</option>
          </select>
        </FieldContent>
        <FieldError errors={[errors.serviceType]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="message" className="text-white">Message</FieldLabel>
        <FieldContent>
          <Textarea 
            id="message" 
            {...register("message")} 
            placeholder="Tell me about your project..." 
            className="bg-white/5 border-white/10 text-white min-h-[150px]"
          />
        </FieldContent>
        <FieldError errors={[errors.message]} />
      </Field>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-accent-gold text-black font-bold py-6 hover:bg-accent-hover transition-colors uppercase tracking-widest text-sm"
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Message"}
      </Button>
    </form>
  );
}
