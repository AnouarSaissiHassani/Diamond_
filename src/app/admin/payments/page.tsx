import { prisma } from "@/lib/prisma";
import PaymentList from "./PaymentList";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const payments = await prisma.reglement.findMany({
    include: {
      client: true,
      facture: true,
    },
    orderBy: { date: 'desc' }
  });

  const factures = await prisma.facture.findMany({
    include: {
      client: true,
    },
    orderBy: { date: 'desc' }
  });

  const clients = await prisma.client.findMany({
    orderBy: { firstName: 'asc' }
  });

  return <PaymentList payments={payments} factures={factures} clients={clients} />;
}
