"use client";

import { useState } from "react";
import { Star, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, TendanceIcon } from "@/lib/admin-data";
import { createTreatment, deleteTreatment } from "@/app/actions/admin";

export default function TreatmentList({ treatments }: { treatments: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, this would come from a query grouping reservations by treatment
  // For now we calculate total reservations / revenue directly if we had them, 
  // but since treatments array doesn't include the aggregated counts out of the box, 
  // we'll just display the price and a placeholder for stats.
  
  const totalRdvMois = treatments.reduce((s, t) => s + (t.reservations?.length || 0), 0);
  const totalRevMois = treatments.reduce((s, t) => {
    return s + (t.reservations?.length || 0) * t.price;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createTreatment({ 
      name: formData.name, 
      description: formData.description, 
      price: Number(formData.price) 
    });
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({ name: "", description: "", price: "" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous supprimer ce soin ? (Il ne doit pas avoir de rendez-vous associés)")) {
      try {
        await deleteTreatment(id);
      } catch (e) {
        alert("Impossible de supprimer ce soin. Il est probablement lié à des rendez-vous existants.");
      }
    }
  };

  return (
    <div>
      <SectionHeader
        title="Performances des Soins"
        action={
          <div className="flex gap-6 items-center text-xs text-stone-400">
            <span>Total réservations : <strong className="text-stone-700">{totalRdvMois}</strong></span>
            <span>Revenus potentiels : <strong className="text-stone-700">{totalRevMois.toLocaleString("fr-FR")} DH</strong></span>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#292524] text-white uppercase tracking-wider hover:bg-stone-700 transition-colors">
              <Plus size={13} /> Nouveau Soin
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {treatments.map((t, i) => {
          const resCount = t.reservations?.length || 0;
          const revCount = resCount * t.price;
          const revPercent = totalRevMois > 0 ? (revCount / totalRevMois) * 100 : 0;

          return (
            <motion.div
              key={t.id}
              className="bg-white border border-stone-100 p-5 relative group"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button 
                onClick={() => handleDelete(t.id)}
                className="absolute top-4 right-4 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>

              <div className="flex items-start justify-between mb-4 pr-6">
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-widest">{t.price} DH</span>
                  <h3 className="text-stone-800 font-medium mt-0.5" style={{ fontFamily: '"Playfair Display", serif' }}>{t.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center py-3 bg-[#f8f6f3] border border-stone-100">
                  <p className="text-lg font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{resCount}</p>
                  <p className="text-xs text-stone-400 mt-0.5">Réservations</p>
                </div>
                <div className="text-center py-3 bg-[#f8f6f3] border border-stone-100">
                  <p className="text-lg font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{(revCount / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-stone-400 mt-0.5">Revenus DH</p>
                </div>
                <div className="text-center py-3 bg-[#f8f6f3] border border-stone-100">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={11} className="text-[#a89f91] fill-current" />
                    <p className="text-lg font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>4.9</p>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">Note</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                  <span>Part des revenus</span>
                  <span>{Math.round(revPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: "#a89f91" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${revPercent}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white shadow-xl z-50 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
                <h3 className="font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>Ajouter un nouveau soin</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Nom du soin</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" rows={3} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Prix (DH)</label>
                  <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-50 transition-colors">Annuler</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#292524] text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50">
                    {isSubmitting ? "Enregistrement..." : "Ajouter"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
