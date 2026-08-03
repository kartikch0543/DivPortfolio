"use client";

import React, { useState } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/layout/container";
import { Mail, Send, CheckCircle2, ShieldAlert, Sparkles, User, MessageSquare, Tag } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const values = formData as unknown as ContactFormValues;
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Your message has been sent successfully!");
        reset();
      } else {
        setErrorMsg(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-950 text-slate-100 py-12">
      <Container className="max-w-3xl px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Connect with KD Arcade</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-pixel text-white">Get in Touch</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Have a game inquiry, collaboration proposal, bug report, or press question? Divyanshu will read and reply.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur">
          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-300 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot Anti-Spam Field */}
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" /> Your Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="e.g. Alex Smith"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{String(errors.name.message)}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" /> Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{String(errors.email.message)}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" /> Subject
              </label>
              <input
                {...register("subject")}
                type="text"
                placeholder="Game Collaboration / Inquiry"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
              />
              {errors.subject && <p className="text-xs text-rose-400 mt-1">{String(errors.subject.message)}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Message
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Write your message details here..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
              />
              {errors.message && <p className="text-xs text-rose-400 mt-1">{String(errors.message.message)}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
