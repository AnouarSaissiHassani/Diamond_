import { prisma } from "@/lib/prisma";
import ClientList from "./ClientList";

// Forcer le rendu dynamique pour avoir les dernières données de la DB
export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      reservations: {
        orderBy: { date: 'desc' },
      },
      factures: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return <ClientList clients={clients} />;
}
