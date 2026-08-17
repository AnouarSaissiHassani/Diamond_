import { prisma } from "@/lib/prisma";
import DashboardOverview from "./DashboardOverview";
import { startOfDay, endOfDay, startOfMonth, subMonths, format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const today = new Date();
  const startDay = startOfDay(today);
  const endDay = endOfDay(today);
  const startMonth = startOfMonth(today);

  try {
    // Fetch stats
    const totalFacturesMois = await prisma.facture.aggregate({
      _sum: { totalAmount: true },
      where: { date: { gte: startMonth } }
    });
    const revenusMois = totalFacturesMois._sum.totalAmount || 0;

    const nouveauxClients = await prisma.client.count({
      where: { createdAt: { gte: startMonth } }
    });

    const rdvMois = await prisma.reservation.count({
      where: { date: { gte: startMonth } }
    });

    const rdvAttente = await prisma.reservation.count({
      where: { status: "PENDING" }
    });

    const todayReservations = await prisma.reservation.findMany({
      where: { date: { gte: startDay, lte: endDay } },
      include: { client: true, treatment: true },
      orderBy: { date: 'asc' }
    });

    const recentFactures = await prisma.facture.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: { client: true }
    });

    // Fetch last 6 months factures to generate chart data
    const sixMonthsAgo = startOfMonth(subMonths(today, 5));
    const facturesLast6Months = await prisma.facture.findMany({
      where: { date: { gte: sixMonthsAgo } },
      select: { date: true, totalAmount: true }
    });

    const monthsList = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
    const chartData = [];

    for (let i = 5; i >= 0; i--) {
      const d = subMonths(today, i);
      const monthIndex = d.getMonth();
      const year = d.getFullYear();
      
      const monthRevenus = facturesLast6Months
        .filter((f: any) => f.date.getMonth() === monthIndex && f.date.getFullYear() === year)
        .reduce((sum: number, f: any) => sum + f.totalAmount, 0);

      chartData.push({
        name: monthsList[monthIndex],
        revenus: monthRevenus
      });
    }

    // Calculate growth (croissance) compared to last month
    const previousMonthStart = startOfMonth(subMonths(today, 1));
    const previousMonthEnd = endOfDay(subMonths(today, 1)); // Actually end of previous month

    const totalFacturesMoisPrecedent = await prisma.facture.aggregate({
      _sum: { totalAmount: true },
      where: { date: { gte: previousMonthStart, lt: startMonth } }
    });
    const revenusMoisPrecedent = totalFacturesMoisPrecedent._sum.totalAmount || 0;
    
    let croissanceRevenus = 0;
    if (revenusMoisPrecedent === 0 && revenusMois > 0) croissanceRevenus = 100;
    else if (revenusMoisPrecedent > 0) {
      croissanceRevenus = Math.round(((revenusMois - revenusMoisPrecedent) / revenusMoisPrecedent) * 100);
    }

    const clientsMoisPrecedent = await prisma.client.count({
      where: { createdAt: { gte: previousMonthStart, lt: startMonth } }
    });
    let croissanceClients = 0;
    if (clientsMoisPrecedent === 0 && nouveauxClients > 0) croissanceClients = 100;
    else if (clientsMoisPrecedent > 0) {
      croissanceClients = Math.round(((nouveauxClients - clientsMoisPrecedent) / clientsMoisPrecedent) * 100);
    }

    const stats = {
      revenusMois,
      croissanceRevenus,
      nouveauxClients,
      croissanceClients,
      rdvMois,
      rdvAttente,
    };

    return <DashboardOverview stats={stats} chartData={chartData} todayReservations={todayReservations} recentFactures={recentFactures} />;
  } catch (error: any) {
    return (
      <div className="p-8 w-full">
        <div className="bg-red-50 text-red-900 border border-red-200 p-6 rounded-md font-mono text-sm shadow-sm overflow-auto max-h-[80vh]">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> Prisma Database Error Details (Bypassing Next.js Mask)
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold text-red-700">Error Message:</h3>
            <pre className="whitespace-pre-wrap mt-2 p-3 bg-white/60 rounded border border-red-100">{error.message}</pre>
          </div>
          <div>
            <h3 className="font-semibold text-red-700">Stack Trace:</h3>
            <pre className="whitespace-pre-wrap mt-2 p-3 bg-white/60 rounded border border-red-100 text-xs overflow-x-auto">{error.stack}</pre>
          </div>
        </div>
      </div>
    );
  }
}
