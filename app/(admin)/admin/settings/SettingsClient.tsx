"use client";

import * as React from "react";
import { SiteSettings } from "@/lib/db/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, Globe, Phone, BarChart3, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const settingsSchema = z.object({
  contact: z.object({
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
  }),
  socials: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  stats: z.object({
    yearsOfExperience: z.string().min(1, "Required"),
    clientsServed: z.string().min(1, "Required"),
    photosTaken: z.string().min(1, "Required"),
  }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsClientProps {
  initialSettings: SiteSettings;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"contact" | "socials" | "stats">("contact");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialSettings,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update settings");

      toast.success("Settings updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "socials", label: "Social Media", icon: Globe },
    { id: "stats", label: "Site Statistics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">General Settings</h1>
          <p className="text-muted-foreground">
            Manage global site information and configurations.
          </p>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-accent-gold/20 text-accent-gold border border-accent-gold/30 shadow-[0_0_15px_rgba(198,168,124,0.1)]"
                  : "bg-white/5 text-gray-600 hover:bg-accent-gold/10 hover:text-accent-gold border border-white/5"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 bg-secondary rounded-xl border border-white/5 p-6 lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {activeTab === "contact" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="contact.email">Email Address</FieldLabel>
                    <FieldContent>
                      <Input 
                        id="contact.email" 
                        {...register("contact.email")} 
                        placeholder="hello@niniola.com" 
                      />
                    </FieldContent>
                    <FieldError errors={[errors.contact?.email]} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact.phone">Phone Number</FieldLabel>
                    <FieldContent>
                      <Input 
                        id="contact.phone" 
                        {...register("contact.phone")} 
                        placeholder="+234 800 000 0000" 
                      />
                    </FieldContent>
                    <FieldError errors={[errors.contact?.phone]} />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="contact.address">Office Address</FieldLabel>
                  <FieldContent>
                    <Input 
                      id="contact.address" 
                      {...register("contact.address")} 
                      placeholder="Lagos, Nigeria" 
                    />
                  </FieldContent>
                  <FieldError errors={[errors.contact?.address]} />
                </Field>
              </div>
            )}

            {activeTab === "socials" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" /> Instagram
                    </FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("socials.instagram")} 
                        placeholder="https://instagram.com/..." 
                      />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" /> Twitter / X
                    </FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("socials.twitter")} 
                        placeholder="https://twitter.com/..." 
                      />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" /> Facebook
                    </FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("socials.facebook")} 
                        placeholder="https://facebook.com/..." 
                      />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("socials.linkedin")} 
                        placeholder="https://linkedin.com/in/..." 
                      />
                    </FieldContent>
                  </Field>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field>
                    <FieldLabel>Years of Experience</FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("stats.yearsOfExperience")} 
                        placeholder="16+" 
                      />
                    </FieldContent>
                    <FieldError errors={[errors.stats?.yearsOfExperience]} />
                  </Field>
                  <Field>
                    <FieldLabel>Clients Served</FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("stats.clientsServed")} 
                        placeholder="386+" 
                      />
                    </FieldContent>
                    <FieldError errors={[errors.stats?.clientsServed]} />
                  </Field>
                  <Field>
                    <FieldLabel>Photos Taken</FieldLabel>
                    <FieldContent>
                      <Input 
                        {...register("stats.photosTaken")} 
                        placeholder="806+" 
                      />
                    </FieldContent>
                    <FieldError errors={[errors.stats?.photosTaken]} />
                  </Field>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * These stats are displayed in the "About" section on the homepage.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
