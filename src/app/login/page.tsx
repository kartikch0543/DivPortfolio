"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormValues } from "@/lib/validations/auth-schema";
import { AuthService } from "@/services/auth/auth-service";
import type { AuthProvider } from "@/types/auth";
import { Container } from "@/components/layout/container";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";
import { LogIn, Mail, ShieldAlert, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "kartik@kdarcade.com",
      password: "password123",
      rememberMe: true,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const values = formData as unknown as LoginFormValues;
    setLoading(true);
    setErrorMsg("");
    try {
      await AuthService.signInWithEmail(values.email);
      router.push("/profile");
      router.refresh();
    } catch (err) {
      setErrorMsg("Failed to sign in. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: AuthProvider) => {
    setLoading(true);
    try {
      await AuthService.signInWithOAuth(provider);
      router.push("/profile");
      router.refresh();
    } catch (err) {
      setErrorMsg(`OAuth login with ${provider} failed.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 bg-slate-950 text-slate-100">
      <Container className="max-w-md w-full px-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold font-pixel tracking-wide text-white flex items-center justify-center gap-2">
              <LogIn className="w-6 h-6 text-emerald-400" /> Sign In to KD Arcade
            </h1>
            <p className="text-xs text-slate-400">
              Access your player profile, cloud saves, favorites, and developer CMS
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" /> {errorMsg}
            </div>
          )}

          {/* Social OAuth Logins */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleOAuthSignIn("google")}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 transition"
            >
              Google
            </button>
            <button
              onClick={() => handleOAuthSignIn("github")}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 transition"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </button>
            <button
              onClick={() => handleOAuthSignIn("discord")}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 transition"
            >
              <DiscordIcon className="w-3.5 h-3.5" /> Discord
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[10px] font-mono text-slate-500 uppercase">Or Email</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="name@domain.com"
                />
              </div>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer links */}
          <div className="text-center pt-2 text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline font-medium">
              Create Account
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
