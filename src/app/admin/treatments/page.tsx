import { prisma } from "@/lib/prisma";
import TreatmentList from "./TreatmentList";

export const dynamic = "force-dynamic";

export default async function TreatmentsPage() {
  const treatments = await prisma.treatment.findMany({
    include: {
      reservations: true,
    },
    orderBy: { name: 'asc' }
  });

  return <TreatmentList treatments={treatments} />;
}
