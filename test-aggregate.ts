import { PrismaClient } from './generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { startOfDay, endOfDay, startOfMonth, subMonths } from "date-fns";

const connectionString = 'postgresql://postgres.pwavzyrrihqkbsgllowb:ChmzrSp22YDTYmIo@aws-0-eu-north-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const today = new Date();
  const startDay = startOfDay(today);
  const endDay = endOfDay(today);
  const startMonth = startOfMonth(today);
  const sixMonthsAgo = startOfMonth(subMonths(today, 5));
  const previousMonthStart = startOfMonth(subMonths(today, 1));

  try {
    const [
      totalFacturesMois,
      nouveauxClients,
      rdvMois,
      rdvAttente,
      todayReservations,
      recentFactures,
      facturesLast6Months,
      totalFacturesMoisPrecedent,
      clientsMoisPrecedent
    ] = await Promise.all([
      prisma.facture.aggregate({
        _sum: { totalAmount: true },
        where: { date: { gte: startMonth } }
      }),
      prisma.client.count({
        where: { createdAt: { gte: startMonth } }
      }),
      prisma.reservation.count({
        where: { date: { gte: startMonth } }
      }),
      prisma.reservation.count({
        where: { status: "PENDING" }
      }),
      prisma.reservation.findMany({
        where: { date: { gte: startDay, lte: endDay } },
        include: { client: true, treatment: true },
        orderBy: { date: 'asc' }
      }),
      prisma.facture.findMany({
        take: 5,
        orderBy: { date: 'desc' },
        include: { client: true }
      }),
      prisma.facture.findMany({
        where: { date: { gte: sixMonthsAgo } },
        select: { date: true, totalAmount: true }
      }),
      prisma.facture.aggregate({
        _sum: { totalAmount: true },
        where: { date: { gte: previousMonthStart, lt: startMonth } }
      }),
      prisma.client.count({
        where: { createdAt: { gte: previousMonthStart, lt: startMonth } }
      })
    ]);

    console.log('Success!', totalFacturesMois);
  } catch (error: any) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
