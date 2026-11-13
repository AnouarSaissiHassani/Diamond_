"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw, ArrowLeft } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-6 py-24"
      style={{ backgroundColor: "#faf8f5" }}
    >
      <div
        className="max-w-md w-full bg-white p-10 text-center"
        style={{ border: "1px solid #e7e5e4" }}
      >
        <p
          className="text-stone-400 uppercase mb-3"
          style={{ fontSize: 10, letterSpacing: "0.4em" }}
        >
          Diamond Skin Clinic
        </p>

        <h2
          className="text-stone-800 mb-4"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "1.75rem",
          }}
        >
          Une erreur temporaire est survenue
        </h2>

        <p className="text-stone-500 text-sm leading-relaxed mb-8">
          La page demandée n'a pas pu se charger. Veuillez réessayer ou retourner à l'accueil.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#a89f91] text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
          >
            <RotateCw size={14} />
            Réessayer
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft size={14} />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
