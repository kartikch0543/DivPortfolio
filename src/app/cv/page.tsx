import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { CvDocumentView } from "./cv-document-view";

export const metadata: Metadata = {
  title: "Curriculum Vitae (CV) | Divyanshu Kumar - Game Developer",
  description:
    "Curriculum Vitae of Divyanshu Kumar: Game Developer proficient in Unity, C#, Godot, and WebGL game development.",
};

export default function CvPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-16 pt-20 md:pt-24 print:p-0 print:bg-white print:text-black">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
              <FileText className="w-3.5 h-3.5 text-brand-primary" />
              <span>Divyanshu_Kumar_CV.pdf</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/divyanshu-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-mono uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>

            <a
              href="/divyanshu-cv.pdf"
              download="Divyanshu_Kumar_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-primary text-brand-cream text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main CV Document Rendering */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <CvDocumentView />
      </main>
    </div>
  );
}
