import { prisma } from "@/lib/prisma";
import ReservationList from "./ReservationList";

export const dynamic = "force-dynamic";

export default async function ReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: {
      client: true,
      treatment: true,
    },
    orderBy: { date: 'desc' }
  });

  const clients = await prisma.client.findMany({
    orderBy: { firstName: 'asc' }
  });

  const treatments = await prisma.treatment.findMany({
    orderBy: { name: 'asc' }
  });

  return <ReservationList reservations={reservations} clients={clients} treatments={treatments} />;
}
