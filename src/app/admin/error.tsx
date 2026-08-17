"use client";

import { useEffect } from "react";
import { DiamondLogo } from "@/lib/admin-data";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-red-100 p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="bg-red-50 p-3 mb-4 rounded-full text-red-500">
            <DiamondLogo size={32} />
          </div>
          <h1 className="text-2xl font-semibold text-red-600" style={{ fontFamily: '"Playfair Display", serif' }}>
            Erreur de base de données
          </h1>
          <p className="text-sm text-stone-500 mt-2 text-center">
            Impossible de charger les données du tableau de bord. La connexion à Supabase a échoué.
          </p>
        </div>

        <div className="bg-stone-50 p-4 border border-stone-200 rounded-sm text-xs font-mono text-stone-700 overflow-auto whitespace-pre-wrap mb-6">
          {error.message || "Erreur inconnue de connexion à la base de données"}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-[#292524] text-white text-sm uppercase tracking-widest hover:bg-stone-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
}
