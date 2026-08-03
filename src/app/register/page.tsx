"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, type RegisterFormValues } from "@/lib/validations/auth-schema";
import { AuthService } from "@/services/auth/auth-service";
import { Container } from "@/components/layout/container";
import { UserPlus, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "Player" as "Player" | "Developer",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const values = formData as unknown as RegisterFormValues;
    setLoading(true);
    try {
      await AuthService.signInWithEmail(values.email);
      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 bg-slate-950 text-slate-100">
      <Container className="max-w-md w-full px-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold font-pixel tracking-wide text-white flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-emerald-400" /> Create Account
            </h1>
            <p className="text-xs text-slate-400">
              Join KD Arcade to save progress, submit reviews, and access developer tools
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Kartik Choudhary"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{String(errors.name.message)}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Username</label>
              <input
                {...register("username")}
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
                placeholder="kdivyanshu"
              />
              {errors.username && <p className="text-xs text-rose-400 mt-1">{String(errors.username.message)}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
                placeholder="name@domain.com"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{String(errors.email.message)}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-rose-400 mt-1">{String(errors.password.message)}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Account Role</label>
              <select
                {...register("role")}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Player">Player (Discover, play, review)</option>
                <option value="Developer">Developer (Game publishing, CMS, analytics)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2"
            >
              {loading ? "Creating..." : "Register"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
