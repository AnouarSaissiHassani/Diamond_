"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Calendar, Users, Activity, CheckCircle, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";

export default function DashboardOverview({ stats, chartData, todayReservations, recentFactures }: any) {
  
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenus (Mois)", value: `${stats.revenusMois.toLocaleString("fr-FR")} DH`, sub: `+${stats.croissanceRevenus}% ce mois`, icon: Activity, up: true },
          { label: "Nouveaux Patients", value: stats.nouveauxClients.toString(), sub: `+${stats.croissanceClients}% ce mois`, icon: Users, up: true },
          { label: "Rendez-vous", value: stats.rdvMois.toString(), sub: `${stats.rdvAttente} en attente`, icon: Calendar, up: false },
          { label: "Taux de satisfaction", value: "4.9/5", sub: "+0.1 ce mois", icon: CheckCircle, up: true },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-stone-100 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 text-stone-800">
              <s.icon size={48} />
            </div>
            <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-3">{s.label}</p>
            <h3 className="text-3xl font-semibold text-stone-800 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>{s.value}</h3>
            <div className="flex items-center gap-1.5 text-xs">
              {s.up ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-amber-500" />}
              <span className={s.up ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>{s.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white border border-stone-100">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-stone-800">Évolution des revenus</h2>
              <p className="text-xs text-stone-400 mt-0.5">30 derniers jours</p>
            </div>
            <select className="text-xs border-none bg-stone-50 text-stone-600 px-3 py-1.5 focus:outline-none cursor-pointer">
              <option>Ce mois</option>
              <option>Le mois dernier</option>
              <option>Cette année</option>
            </select>
          </div>
          <div className="h-72 p-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#292524" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#292524" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a8a29e' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a8a29e' }} dx={-10} tickFormatter={(v) => `${v/1000}k`} />
                <CartesianGrid vertical={false} stroke="#f5f5f4" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#292524', border: 'none', borderRadius: '0', color: 'white', fontSize: '12px' }}
                  itemStyle={{ color: '#e7e5e4' }}
                  formatter={(v: any) => [`${Number(v).toLocaleString("fr-FR")} DH`, "Revenus"]}
                />
                <Area type="monotone" dataKey="revenus" stroke="#292524" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenus)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agenda Today */}
        <div className="bg-white border border-stone-100">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-stone-800">Aujourd'hui</h2>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1">{todayReservations.length} RDV</span>
          </div>
          <div className="p-5 space-y-4">
            {todayReservations.length === 0 ? (
              <p className="text-xs text-stone-500">Aucun rendez-vous prévu aujourd'hui.</p>
            ) : (
              todayReservations.map((r: any, i: number) => (
                <div key={r.id} className="flex gap-4">
                  <div className="w-12 text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-stone-700">{new Date(r.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                  <div className="relative pl-4 border-l-2 border-stone-200 pb-4">
                    <div className="absolute w-2.5 h-2.5 bg-white border-2 border-stone-800 rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-medium text-stone-800">{r.client?.firstName} {r.client?.lastName}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{r.treatment?.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] px-1.5 py-0.5 border ${r.status === 'PENDING' ? 'border-amber-200 text-amber-700 bg-amber-50' : 'border-emerald-200 text-emerald-700 bg-emerald-50'}`}>
                        {r.status === 'PENDING' ? 'En attente' : 'Confirmé'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
