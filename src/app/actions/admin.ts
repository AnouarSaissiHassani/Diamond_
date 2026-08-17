"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// CLIENTS
export async function createClient(data: { firstName: string; lastName: string; email: string; phone: string }) {
  await prisma.client.create({ data });
  revalidatePath("/admin/clients");
}

export async function deleteClient(id: string) {
  // Prisma will cascade delete reservations and factures if configured, 
  // but if not, we must delete relations first. Based on schema:
  // factureItems have cascade, but client's factures/reservations need explicit or cascade.
  // Assuming simple delete for now, if it fails due to FK we will handle it.
  await prisma.client.delete({ where: { id } });
  revalidatePath("/admin/clients");
}

// RESERVATIONS
export async function createReservation(data: { clientId: string; treatmentId: string; date: Date; notes?: string }) {
  await prisma.reservation.create({
    data: {
      clientId: data.clientId,
      treatmentId: data.treatmentId,
      date: data.date,
      status: "PENDING",
      notes: data.notes
    }
  });
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/clients/[id]");
}

export async function updateReservationStatus(id: string, status: string) {
  await prisma.reservation.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/clients/[id]");
}

export async function deleteReservation(id: string) {
  await prisma.reservation.delete({ where: { id } });
  revalidatePath("/admin/reservations");
  revalidatePath("/admin/clients/[id]");
}

// TREATMENTS
export async function createTreatment(data: { name: string; description: string; price: number }) {
  await prisma.treatment.create({ data });
  revalidatePath("/admin/treatments");
}

export async function deleteTreatment(id: string) {
  await prisma.treatment.delete({ where: { id } });
  revalidatePath("/admin/treatments");
}

// PAYMENTS (Reglements)
export async function createPayment(data: { clientId: string; factureId?: string; amount: number; paymentMethod: string }) {
  await prisma.reglement.create({ data });
  
  if (data.factureId) {
    // Check if facture is fully paid
    const facture = await prisma.facture.findUnique({ where: { id: data.factureId }, include: { reglements: true } });
    if (facture) {
      const totalPaid = facture.reglements.reduce((sum, r) => sum + r.amount, 0) + data.amount;
      if (totalPaid >= facture.totalAmount) {
        await prisma.facture.update({ where: { id: data.factureId }, data: { status: "PAID" } });
      } else {
        await prisma.facture.update({ where: { id: data.factureId }, data: { status: "PARTIAL" } });
      }
    }
  }

  revalidatePath("/admin/payments");
  revalidatePath("/admin/clients/[id]");
}
