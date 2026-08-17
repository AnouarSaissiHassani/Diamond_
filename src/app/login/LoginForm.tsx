"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DiamondLogo } from "@/lib/admin-data";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    if (res?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Identifiants incorrects.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-stone-100 p-8 shadow-sm"
      >
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-[#292524] p-3 mb-4 rounded-sm">
            <DiamondLogo size={24} />
          </div>
          <h1 className="text-2xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>
            Diamond Clinic
          </h1>
          <p className="text-sm text-stone-500 mt-1">Espace Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#a89f91] transition-colors"
              placeholder="admin@diamondclinic.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#a89f91] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs px-4 py-3 border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#292524] text-white text-sm uppercase tracking-widest hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
