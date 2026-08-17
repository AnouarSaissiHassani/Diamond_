"use client";

import { useState, useMemo } from "react";
import { Plus, Search, MoreHorizontal, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, StatusBadgeRdv } from "@/lib/admin-data";
import { createReservation, updateReservationStatus, deleteReservation } from "@/app/actions/admin";

export default function ReservationList({ reservations, clients, treatments }: { reservations: any[], clients: any[], treatments: any[] }) {
  const [filter, setFilter] = useState<string>("Tous");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ clientId: "", treatmentId: "", date: "", time: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuts = ["Tous", "PENDING", "TREATED", "CANCELLED"];

  const filtered = useMemo(() =>
    reservations.filter(r => {
      const matchFilter = filter === "Tous" || r.status === filter;
      const clientName = `${r.client?.firstName} ${r.client?.lastName}`.toLowerCase();
      const soinName = r.treatment?.name?.toLowerCase() || "";
      const matchSearch = search === "" ||
        clientName.includes(search.toLowerCase()) ||
        soinName.includes(search.toLowerCase());
      return matchFilter && matchSearch;
    }),
    [filter, search, reservations]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Combine date and time
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    await createReservation({ ...formData, date: dateTime });
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({ clientId: "", treatmentId: "", date: "", time: "", notes: "" });
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateReservationStatus(id, newStatus);
  };

  return (
    <div>
      <SectionHeader
        title="Rendez-vous"
        action={
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#292524] text-white text-xs uppercase tracking-wider hover:bg-stone-700 transition-colors">
            <Plus size={13} /> Nouveau
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-grow max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Rechercher un patient ou un soin..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 bg-white text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:border-[#a89f91] transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuts.map(s => {
            const label = s === "PENDING" ? "En attente" : s === "TREATED" ? "Terminé" : s === "CANCELLED" ? "Annulé" : "Tous";
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-4 py-2 text-xs border transition-all"
                style={{
                  backgroundColor: filter === s ? "#292524" : "white",
                  color: filter === s ? "white" : "#78716c",
                  borderColor: filter === s ? "#292524" : "#e7e5e4",
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white border border-stone-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              {["Client", "Soin", "Date", "Heure", "Praticien", "Statut", "Montant", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-stone-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const dateObj = new Date(r.date);
              return (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-stone-50 hover:bg-[#faf8f5] transition-colors"
                >
                  <td className="px-4 py-3.5 font-medium text-stone-800 whitespace-nowrap">{r.client?.firstName} {r.client?.lastName}</td>
                  <td className="px-4 py-3.5 text-stone-600 whitespace-nowrap">{r.treatment?.name || "-"}</td>
                  <td className="px-4 py-3.5 text-stone-500 whitespace-nowrap">{dateObj.toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3.5 text-stone-500 whitespace-nowrap">{dateObj.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</td>
                  <td className="px-4 py-3.5 text-stone-500 text-xs whitespace-nowrap">Dr Bouchera S H</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <select 
                      value={r.status} 
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className="text-xs bg-transparent border-none outline-none cursor-pointer"
                    >
                      <option value="PENDING">En attente</option>
                      <option value="TREATED">Terminé</option>
                      <option value="CANCELLED">Annulé</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-stone-800 whitespace-nowrap">{r.treatment?.price || 0} DH</td>
                  <td className="px-4 py-3.5">
                    <button className="text-stone-300 hover:text-stone-600 transition-colors"><MoreHorizontal size={16} /></button>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-stone-400 text-sm">Aucun rendez-vous trouvé.</div>
        )}
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
                <h3 className="font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>Nouveau Rendez-vous</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Client</label>
                  <select required value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91] bg-white">
                    <option value="">Sélectionner un client...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Soin</label>
                  <select required value={formData.treatmentId} onChange={e => setFormData({...formData, treatmentId: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91] bg-white">
                    <option value="">Sélectionner un soin...</option>
                    {treatments.map(t => <option key={t.id} value={t.id}>{t.name} ({t.price} DH)</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-stone-500 font-medium">Date</label>
                    <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-stone-500 font-medium">Heure</label>
                    <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Notes (optionnel)</label>
                  <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" rows={3} />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-50 transition-colors">Annuler</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#292524] text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50">
                    {isSubmitting ? "Enregistrement..." : "Planifier"}
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
