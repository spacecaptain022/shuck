"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validations/contact";
import type { z } from "zod";

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      reset();
      setSuccess(true);
      toast.success("Message sent. We'll get back to you soon.");
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
        Get in touch
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Contact</h1>
      <p className="text-muted-foreground text-sm mb-10">
        Questions about your order or anything else — we&apos;re here.
      </p>

      {success ? (
        <div className="rounded-3xl bg-secondary/60 p-10 text-center">
          <p className="font-semibold text-lg mb-2">Message received.</p>
          <p className="text-sm text-muted-foreground">We&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              className="rounded-2xl h-12"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="your@email.com"
              className="rounded-2xl h-12"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              placeholder="What's on your mind?"
              rows={5}
              className="rounded-2xl resize-none"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-2xl font-semibold"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  );
}
