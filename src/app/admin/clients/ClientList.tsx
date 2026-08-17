"use client";

import { useState, useMemo } from "react";
import { Search, Eye, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "@/lib/admin-data";
import { createClient, deleteClient } from "@/app/actions/admin";

export default function ClientList({ clients }: { clients: any[] }) {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = useMemo(() =>
    clients.filter(c =>
      search === "" ||
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.phone && c.phone.toLowerCase().includes(search.toLowerCase()))
    ),
    [search, clients]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createClient(formData);
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
      await deleteClient(id);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Clients"
        action={
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-400">{clients.length} clients enregistrés</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#292524] text-white text-xs uppercase tracking-wider hover:bg-stone-700 transition-colors"
            >
              <Plus size={13} /> Nouveau Client
            </button>
          </div>
        }
      />

      <div className="relative max-w-sm mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Rechercher par nom, email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-stone-200 bg-white text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:border-[#a89f91] transition-colors"
        />
      </div>

      <div className="bg-white border border-stone-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              {["Client", "Email", "Téléphone", "Dernière visite", "Nb soins", "Total dépensé", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-stone-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const nbSoins = c.reservations?.length || 0;
              const totalDepense = c.factures?.reduce((sum: number, f: any) => sum + f.totalAmount, 0) || 0;
              const derniereVisite = c.reservations?.[0]?.date 
                ? new Date(c.reservations[0].date).toLocaleDateString('fr-FR')
                : "-";

              return (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-stone-50 hover:bg-[#faf8f5] transition-colors"
                >
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#f0ede9] flex items-center justify-center text-[#a89f91] text-xs font-semibold flex-shrink-0">
                        {c.firstName[0]}{c.lastName[0]}
                      </div>
                      <span className="font-medium text-stone-800">{c.firstName} {c.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-stone-500 text-xs">{c.email || "-"}</td>
                  <td className="px-4 py-3.5 text-stone-500 text-xs whitespace-nowrap">{c.phone || "-"}</td>
                  <td className="px-4 py-3.5 text-stone-500 whitespace-nowrap">{derniereVisite}</td>
                  <td className="px-4 py-3.5 text-center whitespace-nowrap">
                    <span className="bg-[#f8f6f3] text-stone-600 text-xs px-2 py-0.5 border border-stone-100">{nbSoins}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-stone-800 whitespace-nowrap">{totalDepense.toLocaleString("fr-FR")} DH</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/clients/${c.id}`} className="flex items-center gap-1 text-xs text-stone-400 hover:text-[#a89f91] transition-colors">
                        <Eye size={13} /> Voir
                      </Link>
                      <button onClick={() => handleDelete(c.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-stone-400 text-sm">Aucun client trouvé.</div>
        )}
      </div>

      {/* Modal d'ajout */}
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
                <h3 className="font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>Ajouter un nouveau client</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-stone-500 font-medium">Prénom</label>
                    <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-stone-500 font-medium">Nom</label>
                    <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Téléphone</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-50 transition-colors">
                    Annuler
                  </button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#292524] text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50">
                    {isSubmitting ? "Enregistrement..." : "Ajouter le client"}
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
