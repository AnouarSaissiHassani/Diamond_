"use server";

import { prisma } from "@/lib/prisma";

export type PublicReservationData = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  treatmentId: string;
  date: string;
  heure: string;
  message: string;
};

export async function submitPublicReservation(data: PublicReservationData) {
  try {
    // 1. Chercher si le client existe déjà par son email
    let client = await prisma.client.findFirst({
      where: { email: data.email }
    });

    // 2. S'il n'existe pas, on le crée
    if (!client) {
      client = await prisma.client.create({
        data: {
          firstName: data.prenom,
          lastName: data.nom,
          email: data.email,
          phone: data.telephone,
        }
      });
    } else {
      // Optionnel : mettre à jour le téléphone s'il était manquant
      if (!client.phone && data.telephone) {
        await prisma.client.update({
          where: { id: client.id },
          data: { phone: data.telephone }
        });
      }
    }

    // 3. Construire la date exacte
    // data.date est format "YYYY-MM-DD"
    // data.heure est format "9h00" ou "14h30" (ou vide)
    let reservationDate = new Date(data.date);
    
    if (data.heure) {
      const parts = data.heure.replace('h', ':').split(':');
      if (parts.length >= 1) {
        reservationDate.setHours(parseInt(parts[0], 10), parseInt(parts[1] || "0", 10));
      }
    }

    // 4. Vérifier si le soin existe dans la base
    let validTreatmentId: string | null = null;
    let treatmentNote = "";
    if (data.treatmentId) {
      try {
        const found = await prisma.treatment.findUnique({
          where: { id: data.treatmentId },
          select: { id: true, name: true },
        });
        if (found) {
          validTreatmentId = found.id;
        } else {
          treatmentNote = ` [Soin: ${data.treatmentId}]`;
        }
      } catch {
        treatmentNote = ` [Soin: ${data.treatmentId}]`;
      }
    }

    // 5. Créer la réservation
    await prisma.reservation.create({
      data: {
        clientId: client.id,
        treatmentId: validTreatmentId,
        date: reservationDate,
        status: "PENDING",
        notes: data.message
          ? `Demande via site web${treatmentNote}: ${data.message}`
          : `Demande via site web${treatmentNote}`,
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la réservation publique :", error);
    return { success: false, error: "Une erreur est survenue lors de l'enregistrement de votre rendez-vous." };
  }
}
