"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { submitPublicReservation, PublicReservationData } from "@/app/actions/public";

const heures = [
  "9h00", "10h00", "11h00", "14h00", "15h00", "16h00", "17h00"
];

const inputClass =
  "w-full border border-stone-200 bg-white px-4 py-3.5 text-stone-700 text-sm placeholder-stone-300 focus:outline-none focus:border-[#a89f91] transition-colors duration-200";

const labelClass =
  "block text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-2";

export default function BookingForm({ treatments }: { treatments: { id: string, name: string }[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PublicReservationData>();

  const onSubmit = async (data: PublicReservationData) => {
    setIsSubmitting(true);
    setError("");
    const res = await submitPublicReservation(data);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      reset();
    } else {
      setError(res.error || "Erreur de soumission");
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center text-center py-24 px-8"
        style={{ backgroundColor: "white", border: "1px solid #e7e5e4" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle size={48} className="text-[#a89f91] mb-6" strokeWidth={1.5} />
        <h3
          className="text-stone-800 mb-3"
          style={{ fontFamily: '"Playfair Display", serif', fontSize: "1.5rem" }}
        >
          Demande Envoyée
        </h3>
        <p className="text-stone-500 leading-relaxed mb-8 max-w-sm" style={{ fontSize: "0.9375rem" }}>
          Merci pour votre demande. Notre équipe vous contactera dans les 24 heures pour confirmer votre rendez-vous.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="flex items-center gap-2 text-[#a89f91] hover:text-stone-800 transition-colors text-sm"
          style={{ letterSpacing: "0.1em" }}
        >
          Faire une nouvelle demande <ArrowRight size={14} />
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 md:p-10"
      style={{ border: "1px solid #e7e5e4" }}
    >
      <p
        className="text-stone-400 uppercase mb-8"
        style={{ fontSize: 10, letterSpacing: "0.35em" }}
      >
        Formulaire de Demande
      </p>

      {error && (
        <div className="bg-red-50 text-red-500 text-xs px-4 py-3 mb-6 border border-red-100">
          {error}
        </div>
      )}

      {/* Prénom + Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Prénom *</label>
          <input
            {...register("prenom", { required: "Prénom requis" })}
            type="text"
            placeholder="Sara"
            className={inputClass}
          />
          {errors.prenom && (
            <p className="text-red-400 text-xs mt-1">{errors.prenom.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Nom *</label>
          <input
            {...register("nom", { required: "Nom requis" })}
            type="text"
            placeholder="Idrissi"
            className={inputClass}
          />
          {errors.nom && (
            <p className="text-red-400 text-xs mt-1">{errors.nom.message}</p>
          )}
        </div>
      </div>

      {/* Email + Téléphone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Adresse E-mail *</label>
          <input
            {...register("email", {
              required: "Email requis",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email invalide",
              },
            })}
            type="email"
            placeholder="Sara.Idrissi@gmail.com"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Téléphone</label>
          <input
            {...register("telephone")}
            type="tel"
            placeholder="+212 6 67 11 22 33"
            className={inputClass}
          />
        </div>
      </div>

      {/* Soin */}
      <div className="mb-5">
        <label className={labelClass}>Soin Souhaité *</label>
        <select
          {...register("treatmentId", { required: "Veuillez sélectionner un soin" })}
          className={inputClass}
          style={{ appearance: "none", cursor: "pointer" }}
        >
          <option value="">— Sélectionner un soin —</option>
          {treatments.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
          <option value="">Consultation (sans soin précis)</option>
        </select>
        {errors.treatmentId && (
          <p className="text-red-400 text-xs mt-1">{errors.treatmentId.message}</p>
        )}
      </div>

      {/* Date + Heure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Date Souhaitée *</label>
          <input
            {...register("date", { required: "Date requise" })}
            type="date"
            className={inputClass}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.date && (
            <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Heure Souhaitée</label>
          <select
            {...register("heure")}
            className={inputClass}
            style={{ appearance: "none", cursor: "pointer" }}
          >
            <option value="">— Heure de préférence —</option>
            {heures.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mb-8">
        <label className={labelClass}>Message (optionnel)</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Précisez vos attentes, vos préoccupations cutanées ou toute question particulière..."
          className={inputClass}
          style={{ resize: "none" }}
        />
      </div>

      {/* Légal */}
      <p className="text-stone-400 text-xs leading-relaxed mb-7">
        En soumettant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour la prise en charge de votre demande de rendez-vous. Aucune donnée n'est partagée avec des tiers.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 text-white transition-colors duration-300 hover:bg-stone-700 disabled:opacity-50"
        style={{
          backgroundColor: "#292524",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer Ma Demande"}
        {!isSubmitting && <ArrowRight size={13} />}
      </button>
    </form>
  );
}
