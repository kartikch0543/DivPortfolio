"use client";

import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSettingsSchema, type ProfileSettingsFormValues } from "@/lib/validations/settings-schema";
import { CmsService } from "@/services/cms-service";
import { User, Save, CheckCircle2, Loader2 } from "lucide-react";

export default function ProfileSettingsCmsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSettingsSchema),
  });

  useEffect(() => {
    CmsService.getProfileSettings().then((data) => {
      reset({
        name: data.name,
        username: data.username,
        bio: data.bio,
        avatarUrl: data.avatarUrl,
        email: data.email,
        role: data.role,
        website: data.website || "",
        github: data.socials.github || "",
        twitter: data.socials.twitter || "",
        itchIo: data.socials.itchIo || "",
        discord: data.socials.discord || "",
      });
    });
  }, [reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const values = formData as unknown as ProfileSettingsFormValues;
    setIsSubmitting(true);
    setSaved(false);
    try {
      const current = await CmsService.getProfileSettings();
      await CmsService.saveProfileSettings({
        ...current,
        name: values.name,
        username: values.username,
        bio: values.bio,
        avatarUrl: values.avatarUrl,
        email: values.email,
        role: values.role,
        website: values.website,
        socials: {
          github: values.github,
          twitter: values.twitter,
          itchIo: values.itchIo,
          discord: values.discord,
        },
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold font-pixel text-white flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" /> Developer Profile Settings
          </h2>
          <p className="text-xs text-slate-400">Manage developer bio, avatar, social handles, and contact details</p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Profile
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-purple-950/60 border border-purple-800 rounded-lg text-xs font-mono text-purple-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
            />
            {errors.name && <p className="text-xs text-rose-400 mt-1">{String(errors.name.message)}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Username</label>
            <input
              {...register("username")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none font-mono"
            />
            {errors.username && <p className="text-xs text-rose-400 mt-1">{String(errors.username.message)}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Bio</label>
          <textarea
            {...register("bio")}
            rows={3}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Avatar Image URL</label>
            <input
              {...register("avatarUrl")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Role</label>
            <select
              {...register("role")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
              <option value="Player">Player</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}
