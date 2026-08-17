"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, StatusBadgePay } from "@/lib/admin-data";
import { createPayment } from "@/app/actions/admin";

export default function PaymentList({ payments, factures, clients }: { payments: any[], factures: any[], clients: any[] }) {
  const [filter, setFilter] = useState<string>("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ clientId: "", factureId: "", amount: "", paymentMethod: "CARD" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We consider factures as the primary source of truth for payments list if we want to show status
  // But the prompt asks for Payments list. The old UI listed payments.
  
  const statuts = ["Tous", "PAID", "PARTIAL", "PENDING"];

  const filteredPayments = useMemo(() =>
    payments.filter(p => {
      if (filter === "Tous") return true;
      const factureStatus = factures.find((f: any) => f.id === p.factureId)?.status;
      return factureStatus === filter;
    }),
    [filter, payments, factures]
  );

  const totalComplété = factures.filter((f: any) => f.status === "PAID").reduce((s: number, f: any) => s + f.totalAmount, 0);
  const totalEnAttente = factures.filter((f: any) => f.status === "PENDING" || f.status === "PARTIAL").reduce((s: number, f: any) => s + f.totalAmount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createPayment({ 
      clientId: formData.clientId,
      factureId: formData.factureId || undefined,
      amount: Number(formData.amount),
      paymentMethod: formData.paymentMethod
    });
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({ clientId: "", factureId: "", amount: "", paymentMethod: "CARD" });
  };

  return (
    <div>
      <SectionHeader 
        title="Paiements & Transactions" 
        action={
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#292524] text-white text-xs uppercase tracking-wider hover:bg-stone-700 transition-colors">
            <Plus size={13} /> Nouveau Paiement
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-stone-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-stone-400 uppercase tracking-widest">Encaissé</span>
          </div>
          <p className="text-2xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{totalComplété.toLocaleString("fr-FR")} DH</p>
        </div>
        <div className="bg-white border border-stone-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-400 uppercase tracking-widest">En attente</span>
          </div>
          <p className="text-2xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{totalEnAttente.toLocaleString("fr-FR")} DH</p>
        </div>
        <div className="bg-white border border-stone-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-stone-400 uppercase tracking-widest">Total Facturé</span>
          </div>
          <p className="text-2xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{(totalComplété + totalEnAttente).toLocaleString("fr-FR")} DH</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {statuts.map(s => {
          const label = s === "PAID" ? "Complété" : s === "PARTIAL" ? "Partiel" : s === "PENDING" ? "En attente" : "Tous";
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

      <div className="bg-white border border-stone-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              {["Référence", "Client", "Montant", "Date", "Méthode", "Facture Liée"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-stone-400 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-stone-50 hover:bg-[#faf8f5] transition-colors"
              >
                <td className="px-4 py-3.5 font-mono text-xs text-stone-400 whitespace-nowrap">{p.id.slice(0,8)}</td>
                <td className="px-4 py-3.5 font-medium text-stone-800 whitespace-nowrap">{p.client?.firstName} {p.client?.lastName}</td>
                <td className="px-4 py-3.5 font-semibold text-stone-800 whitespace-nowrap">{p.amount} DH</td>
                <td className="px-4 py-3.5 text-stone-500 whitespace-nowrap">{new Date(p.date).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3.5 text-stone-500 whitespace-nowrap">
                  {p.paymentMethod === 'CARD' ? 'Carte Bancaire' : p.paymentMethod === 'CASH' ? 'Espèces' : 'Chèque'}
                </td>
                <td className="px-4 py-3.5 text-stone-500 text-xs font-mono whitespace-nowrap">
                  {p.factureId ? p.factureId.slice(0,8) : '-'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredPayments.length === 0 && (
          <div className="text-center py-16 text-stone-400 text-sm">Aucun paiement trouvé.</div>
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
                <h3 className="font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>Enregistrer un paiement</h3>
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
                  <label className="text-xs text-stone-500 font-medium">Facture (Optionnel)</label>
                  <select value={formData.factureId} onChange={e => setFormData({...formData, factureId: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91] bg-white">
                    <option value="">Sélectionner une facture...</option>
                    {factures.filter((f: any) => f.clientId === formData.clientId && f.status !== "PAID").map((f: any) => (
                      <option key={f.id} value={f.id}>{f.totalAmount} DH - {new Date(f.date).toLocaleDateString()}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Montant (DH)</label>
                  <input required type="number" min="0" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-500 font-medium">Méthode</label>
                  <select required value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-[#a89f91] bg-white">
                    <option value="CARD">Carte Bancaire</option>
                    <option value="CASH">Espèces</option>
                    <option value="CHECK">Chèque</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-stone-500 hover:bg-stone-50 transition-colors">Annuler</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#292524] text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50">
                    {isSubmitting ? "Enregistrement..." : "Enregistrer"}
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
