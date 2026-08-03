"use client";

import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSettingsSchema, type SiteSettingsFormValues } from "@/lib/validations/settings-schema";
import { CmsService } from "@/services/cms-service";
import { Settings, Save, CheckCircle2, Loader2 } from "lucide-react";

export default function SiteSettingsCmsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(siteSettingsSchema),
  });

  useEffect(() => {
    CmsService.getSiteSettings().then((data) => {
      reset({
        studioName: data.studioName,
        tagline: data.tagline,
        description: data.description,
        canonicalUrl: data.canonicalUrl,
        contactEmail: data.contactEmail,
        maintenanceMode: data.maintenanceMode,
        featuredGameSlug: data.featuredGameSlug,
        socialGithub: data.socials.github || "",
        socialTwitter: data.socials.twitter || "",
        socialItchIo: data.socials.itchIo || "",
        socialDiscord: data.socials.discord || "",
      });
    });
  }, [reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const values = formData as unknown as SiteSettingsFormValues;
    setIsSubmitting(true);
    setSaved(false);
    try {
      await CmsService.saveSiteSettings({
        studioName: values.studioName,
        tagline: values.tagline,
        description: values.description,
        canonicalUrl: values.canonicalUrl,
        contactEmail: values.contactEmail,
        maintenanceMode: values.maintenanceMode,
        featuredGameSlug: values.featuredGameSlug,
        socials: {
          github: values.socialGithub,
          twitter: values.socialTwitter,
          itchIo: values.socialItchIo,
          discord: values.socialDiscord,
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
            <Settings className="w-5 h-5 text-emerald-400" /> Site Settings
          </h2>
          <p className="text-xs text-slate-400">Configure global studio branding, canonical URLs, and social links</p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Settings
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs font-mono text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Global Site Settings saved successfully!
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-mono uppercase text-emerald-400 tracking-wider">Branding & Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Studio Name</label>
            <input
              {...register("studioName")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
            {errors.studioName && <p className="text-xs text-rose-400 mt-1">{String(errors.studioName.message)}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Canonical URL</label>
            <input
              {...register("canonicalUrl")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
            {errors.canonicalUrl && <p className="text-xs text-rose-400 mt-1">{String(errors.canonicalUrl.message)}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Tagline</label>
          <input
            {...register("tagline")}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
