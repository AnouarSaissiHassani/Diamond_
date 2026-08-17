import {
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";

export type StatutRdv = "Confirmé" | "En attente" | "Annulé" | "Terminé";
export type StatutPaiement = "Complété" | "En attente" | "Remboursé";
export type MethodePaiement = "Carte bancaire" | "Virement" | "Espèces";
export type Tendance = "hausse" | "baisse" | "stable";
export type Section = "overview" | "reservations" | "clients" | "soins" | "paiements";

export interface Reservation {
  id: string;
  clientNom: string;
  soin: string;
  date: string;
  heure: string;
  statut: StatutRdv;
  praticien: string;
  montant: number;
}

export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  derniereVisite: string;
  nbSoins: number;
  montantTotal: number;
  ville: string;
}

export interface Paiement {
  id: string;
  clientNom: string;
  soin: string;
  montant: number;
  date: string;
  methode: MethodePaiement;
  statut: StatutPaiement;
}

export interface TreatmentStat {
  titre: string;
  categorie: string;
  reservationsMois: number;
  revenusMois: number;
  noteMoyenne: number;
  tendance: Tendance;
}

export const reservations: Reservation[] = [
  { id: "RDV-001", clientNom: "Sophie Martin", soin: "Soin Signature", date: "2026-08-04", heure: "10h00", statut: "Confirmé", praticien: "Dr. Chloé Renard", montant: 180 },
  { id: "RDV-002", clientNom: "Isabelle Dupont", soin: "Microneedling", date: "2026-08-04", heure: "11h00", statut: "Confirmé", praticien: "Dr. Alix Fontaine", montant: 250 },
  { id: "RDV-003", clientNom: "Camille Lefèvre", soin: "Resurfaçage Laser", date: "2026-08-04", heure: "14h00", statut: "En attente", praticien: "Dr. Chloé Renard", montant: 350 },
  { id: "RDV-004", clientNom: "Nathalie Bernard", soin: "Peeling Chimique", date: "2026-08-05", heure: "9h00", statut: "Confirmé", praticien: "Dr. Alix Fontaine", montant: 150 },
  { id: "RDV-005", clientNom: "Élodie Rousseau", soin: "HydraFacial", date: "2026-08-05", heure: "10h00", statut: "En attente", praticien: "Dr. Chloé Renard", montant: 120 },
  { id: "RDV-006", clientNom: "Marie-Claire Petit", soin: "Injections Fillers", date: "2026-08-05", heure: "15h00", statut: "Confirmé", praticien: "Dr. Alix Fontaine", montant: 300 },
  { id: "RDV-007", clientNom: "Aurélie Garnier", soin: "Luminothérapie LED", date: "2026-08-06", heure: "11h00", statut: "Annulé", praticien: "Dr. Chloé Renard", montant: 90 },
  { id: "RDV-008", clientNom: "Laure Simon", soin: "Dermaplaning", date: "2026-08-06", heure: "14h00", statut: "Confirmé", praticien: "Dr. Alix Fontaine", montant: 85 },
  { id: "RDV-009", clientNom: "Juliette Moreau", soin: "Sculpture Corporelle", date: "2026-08-07", heure: "9h00", statut: "En attente", praticien: "Dr. Chloé Renard", montant: 200 },
  { id: "RDV-010", clientNom: "Sophie Martin", soin: "Peeling Chimique", date: "2026-08-07", heure: "16h00", statut: "Terminé", praticien: "Dr. Alix Fontaine", montant: 150 },
  { id: "RDV-011", clientNom: "Clara Dubois", soin: "Soin Signature", date: "2026-08-08", heure: "10h00", statut: "Confirmé", praticien: "Dr. Chloé Renard", montant: 180 },
  { id: "RDV-012", clientNom: "Viviane Leroy", soin: "Microneedling", date: "2026-08-08", heure: "14h00", statut: "Confirmé", praticien: "Dr. Alix Fontaine", montant: 250 },
];

export const clients: Client[] = [
  { id: "CLI-001", nom: "Sophie Martin", email: "sophie.martin@gmail.com", telephone: "+33 6 12 34 56 78", derniereVisite: "2026-08-04", nbSoins: 8, montantTotal: 1420, ville: "Paris" },
  { id: "CLI-002", nom: "Isabelle Dupont", email: "i.dupont@outlook.fr", telephone: "+33 6 23 45 67 89", derniereVisite: "2026-08-04", nbSoins: 5, montantTotal: 1150, ville: "Paris" },
  { id: "CLI-003", nom: "Camille Lefèvre", email: "camille.lefevre@email.fr", telephone: "+33 6 34 56 78 90", derniereVisite: "2026-07-28", nbSoins: 3, montantTotal: 850, ville: "Neuilly-sur-Seine" },
  { id: "CLI-004", nom: "Nathalie Bernard", email: "n.bernard@gmail.com", telephone: "+33 6 45 67 89 01", derniereVisite: "2026-07-22", nbSoins: 12, montantTotal: 2640, ville: "Paris" },
  { id: "CLI-005", nom: "Élodie Rousseau", email: "elodie.r@gmail.com", telephone: "+33 6 56 78 90 12", derniereVisite: "2026-07-18", nbSoins: 4, montantTotal: 560, ville: "Versailles" },
  { id: "CLI-006", nom: "Marie-Claire Petit", email: "mcpetit@orange.fr", telephone: "+33 6 67 89 01 23", derniereVisite: "2026-08-05", nbSoins: 7, montantTotal: 1890, ville: "Paris" },
  { id: "CLI-007", nom: "Aurélie Garnier", email: "aurelie.garnier@gmail.com", telephone: "+33 6 78 90 12 34", derniereVisite: "2026-07-10", nbSoins: 2, montantTotal: 310, ville: "Boulogne-Billancourt" },
  { id: "CLI-008", nom: "Laure Simon", email: "laure.simon@gmail.com", telephone: "+33 6 89 01 23 45", derniereVisite: "2026-08-06", nbSoins: 6, montantTotal: 980, ville: "Paris" },
  { id: "CLI-009", nom: "Juliette Moreau", email: "j.moreau@gmail.com", telephone: "+33 6 90 12 34 56", derniereVisite: "2026-07-30", nbSoins: 1, montantTotal: 200, ville: "Saint-Germain-en-Laye" },
  { id: "CLI-010", nom: "Clara Dubois", email: "clara.dubois@icloud.com", telephone: "+33 6 01 23 45 67", derniereVisite: "2026-08-08", nbSoins: 9, montantTotal: 2100, ville: "Paris" },
];

export const paiements: Paiement[] = [
  { id: "PAY-2026-089", clientNom: "Sophie Martin", soin: "Soin Signature", montant: 180, date: "2026-08-04", methode: "Carte bancaire", statut: "Complété" },
  { id: "PAY-2026-088", clientNom: "Isabelle Dupont", soin: "Microneedling", montant: 250, date: "2026-08-04", methode: "Carte bancaire", statut: "Complété" },
  { id: "PAY-2026-087", clientNom: "Marie-Claire Petit", soin: "Injections Fillers", montant: 300, date: "2026-08-03", methode: "Virement", statut: "En attente" },
  { id: "PAY-2026-086", clientNom: "Laure Simon", soin: "Dermaplaning", montant: 85, date: "2026-08-02", methode: "Carte bancaire", statut: "Complété" },
  { id: "PAY-2026-085", clientNom: "Nathalie Bernard", soin: "Resurfaçage Laser", montant: 350, date: "2026-08-01", methode: "Carte bancaire", statut: "Complété" },
  { id: "PAY-2026-084", clientNom: "Clara Dubois", soin: "Soin Signature", montant: 180, date: "2026-07-31", methode: "Carte bancaire", statut: "Complété" },
  { id: "PAY-2026-083", clientNom: "Aurélie Garnier", soin: "Luminothérapie LED", montant: 90, date: "2026-07-30", methode: "Espèces", statut: "Remboursé" },
  { id: "PAY-2026-082", clientNom: "Camille Lefèvre", soin: "Peeling Chimique", montant: 150, date: "2026-07-29", methode: "Carte bancaire", statut: "Complété" },
  { id: "PAY-2026-081", clientNom: "Élodie Rousseau", soin: "HydraFacial", montant: 120, date: "2026-07-28", methode: "Carte bancaire", statut: "En attente" },
  { id: "PAY-2026-080", clientNom: "Juliette Moreau", soin: "Sculpture Corporelle", montant: 200, date: "2026-07-25", methode: "Virement", statut: "Complété" },
];

export const treatmentStats: TreatmentStat[] = [
  { titre: "Soin Signature", categorie: "Visage", reservationsMois: 18, revenusMois: 3240, noteMoyenne: 4.9, tendance: "hausse" },
  { titre: "Peeling Chimique", categorie: "Visage", reservationsMois: 14, revenusMois: 2100, noteMoyenne: 4.7, tendance: "stable" },
  { titre: "Microneedling", categorie: "Avancé", reservationsMois: 11, revenusMois: 2750, noteMoyenne: 4.8, tendance: "hausse" },
  { titre: "Resurfaçage Laser", categorie: "Avancé", reservationsMois: 8, revenusMois: 2800, noteMoyenne: 4.9, tendance: "hausse" },
  { titre: "Injections Fillers", categorie: "Avancé", reservationsMois: 10, revenusMois: 3000, noteMoyenne: 4.8, tendance: "stable" },
  { titre: "Luminothérapie LED", categorie: "Visage", reservationsMois: 22, revenusMois: 1980, noteMoyenne: 4.6, tendance: "baisse" },
  { titre: "Dermaplaning", categorie: "Visage", reservationsMois: 16, revenusMois: 1360, noteMoyenne: 4.7, tendance: "stable" },
  { titre: "HydraFacial", categorie: "Visage", reservationsMois: 19, revenusMois: 2280, noteMoyenne: 4.8, tendance: "hausse" },
  { titre: "Sculpture Corporelle", categorie: "Corps", reservationsMois: 7, revenusMois: 1400, noteMoyenne: 4.5, tendance: "baisse" },
];

export const revenueData = [
  { mois: "Sep", revenus: 12400, objectif: 13000 },
  { mois: "Oct", revenus: 14200, objectif: 13000 },
  { mois: "Nov", revenus: 13800, objectif: 14000 },
  { mois: "Déc", revenus: 16200, objectif: 14000 },
  { mois: "Jan", revenus: 14900, objectif: 15000 },
  { mois: "Fév", revenus: 15600, objectif: 15000 },
  { mois: "Mar", revenus: 17200, objectif: 16000 },
  { mois: "Avr", revenus: 16800, objectif: 16000 },
  { mois: "Mai", revenus: 18400, objectif: 17000 },
  { mois: "Jun", revenus: 17900, objectif: 17000 },
  { mois: "Jul", revenus: 19200, objectif: 18000 },
  { mois: "Aoû", revenus: 18450, objectif: 18000 },
];

export const rdvParJour = [
  { jour: "Lun", rdv: 6 },
  { jour: "Mar", rdv: 8 },
  { jour: "Mer", rdv: 7 },
  { jour: "Jeu", rdv: 9 },
  { jour: "Ven", rdv: 10 },
  { jour: "Sam", rdv: 5 },
];

export function DiamondLogo({ size = 18 }: { size?: number }) {
  const h = size / 2;
  const i = size * 0.22;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <polygon points={`${h},1 ${size - 1},${h} ${h},${size - 1} 1,${h}`} stroke="#a89f91" strokeWidth="1.3" fill="none" />
      <polygon points={`${h},${i + 1.5} ${size - i - 1.5},${h} ${h},${size - i - 1.5} ${i + 1.5},${h}`} fill="#a89f91" opacity="0.4" />
    </svg>
  );
}

export function StatusBadgeRdv({ statut }: { statut: StatutRdv }) {
  const cfg: Record<StatutRdv, { bg: string; color: string; dot: string }> = {
    Confirmé: { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" },
    "En attente": { bg: "#fffbeb", color: "#b45309", dot: "#f59e0b" },
    Annulé: { bg: "#fef2f2", color: "#b91c1c", dot: "#ef4444" },
    Terminé: { bg: "#f5f5f4", color: "#78716c", dot: "#a8a29e" },
  };
  const c = cfg[statut];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: c.bg, color: c.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
      {statut}
    </span>
  );
}

export function StatusBadgePay({ statut }: { statut: StatutPaiement }) {
  const cfg: Record<StatutPaiement, { bg: string; color: string; dot: string }> = {
    Complété: { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" },
    "En attente": { bg: "#fffbeb", color: "#b45309", dot: "#f59e0b" },
    Remboursé: { bg: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" },
  };
  const c = cfg[statut];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: c.bg, color: c.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
      {statut}
    </span>
  );
}

export function TendanceIcon({ tendance }: { tendance: Tendance }) {
  if (tendance === "hausse") return <ChevronUp size={14} className="text-emerald-500" />;
  if (tendance === "baisse") return <ChevronDown size={14} className="text-red-400" />;
  return <Minus size={14} className="text-stone-400" />;
}

export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-stone-800 text-lg font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>{title}</h2>
      {action}
    </div>
  );
}
