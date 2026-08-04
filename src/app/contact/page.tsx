"use client";

import React, { useState } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/layout/container";
import { Mail, Send, CheckCircle2, ShieldAlert, Heart, User, MessageSquare, Tag } from "lucide-react";

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
    <div className="min-h-[85vh] py-12">
      <Container className="max-w-3xl px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-purple-950/80 border-2 border-pink-300 dark:border-purple-800 text-pink-900 dark:text-purple-300 text-xs font-mono font-bold shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>Connect with KD Arcade Studio</span>
            <span className="text-pink-400 font-normal">♡</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-pixel text-indigo-950 dark:text-white">Get in Touch ♡</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-medium">
            Have a game inquiry, collaboration proposal, bug report, or press question? Divyanshu will read and reply.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white dark:bg-slate-900 border-2 border-indigo-900/30 dark:border-purple-800/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(67,56,202,0.15)]">
          {/* Retro Window Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-900/10 dark:border-purple-800/30 text-xs font-mono font-bold text-indigo-900 dark:text-purple-300">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-pink-500" /> Send Message Window
            </span>
            <span className="text-pink-400 font-normal">♡ ♡ ♡</span>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border-2 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-300 text-xs font-mono font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot Anti-Spam Field */}
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-indigo-950 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-pink-500" /> Your Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="e.g. Alex Smith"
                  className="w-full px-4 py-2.5 bg-indigo-50/50 dark:bg-slate-950 border-2 border-indigo-900/20 dark:border-purple-800/50 rounded-2xl text-xs text-indigo-950 dark:text-white focus:border-purple-500 focus:outline-none font-medium"
                />
                {errors.name && <p className="text-xs text-rose-500 font-medium mt-1">{String(errors.name.message)}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-pink-500" /> Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 bg-indigo-50/50 dark:bg-slate-950 border-2 border-indigo-900/20 dark:border-purple-800/50 rounded-2xl text-xs text-indigo-950 dark:text-white focus:border-purple-500 focus:outline-none font-medium"
                />
                {errors.email && <p className="text-xs text-rose-500 font-medium mt-1">{String(errors.email.message)}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-indigo-950 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-pink-500" /> Subject
              </label>
              <input
                {...register("subject")}
                type="text"
                placeholder="Game Collaboration / Inquiry"
                className="w-full px-4 py-2.5 bg-indigo-50/50 dark:bg-slate-950 border-2 border-indigo-900/20 dark:border-purple-800/50 rounded-2xl text-xs text-indigo-950 dark:text-white focus:border-purple-500 focus:outline-none font-medium"
              />
              {errors.subject && <p className="text-xs text-rose-500 font-medium mt-1">{String(errors.subject.message)}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-indigo-950 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-pink-500" /> Message
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Write your message details here..."
                className="w-full px-4 py-2.5 bg-indigo-50/50 dark:bg-slate-950 border-2 border-indigo-900/20 dark:border-purple-800/50 rounded-2xl text-xs text-indigo-950 dark:text-white focus:border-purple-500 focus:outline-none font-medium"
              />
              {errors.message && <p className="text-xs text-rose-500 font-medium mt-1">{String(errors.message.message)}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white font-bold rounded-full text-xs sm:text-sm transition-all hover:scale-102 flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(67,56,202,0.2)] border-2 border-indigo-900/30 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {loading ? "Sending Message..." : "Send Message ♡"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
