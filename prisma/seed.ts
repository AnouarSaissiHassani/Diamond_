import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding database...')

  // Clean up existing data (optional but useful for development)
  await prisma.factureItem.deleteMany()
  await prisma.reglement.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.facture.deleteMany()
  await prisma.treatment.deleteMany()
  await prisma.client.deleteMany()

  // 1. Create Treatments (Soins)
  const treatment1 = await prisma.treatment.create({
    data: {
      name: 'Peeling Chimique',
      description: 'Peeling aux acides de fruits pour une peau neuve.',
      price: 600,
    }
  })
  
  const treatment2 = await prisma.treatment.create({
    data: {
      name: 'Soin Hydrafacial',
      description: 'Nettoyage en profondeur et hydratation intense.',
      price: 800,
    }
  })

  const treatment3 = await prisma.treatment.create({
    data: {
      name: 'Microneedling',
      description: 'Stimule la production de collagène.',
      price: 900,
    }
  })

  // 2. Create Clients
  const client1 = await prisma.client.create({
    data: {
      firstName: 'Amina',
      lastName: 'Benali',
      email: 'amina.benali@example.com',
      phone: '+212 6 11 22 33 44',
    }
  })

  const client2 = await prisma.client.create({
    data: {
      firstName: 'Sara',
      lastName: 'El Fassi',
      email: 'sara.elfassi@example.com',
      phone: '+212 6 55 66 77 88',
    }
  })

  const client3 = await prisma.client.create({
    data: {
      firstName: 'Youssef',
      lastName: 'Mansour',
      email: 'youssef.mansour@example.com',
      phone: '+212 6 99 88 77 66',
    }
  })

  // 3. Create Reservations
  await prisma.reservation.create({
    data: {
      clientId: client1.id,
      treatmentId: treatment1.id,
      date: new Date(new Date().setHours(10, 0, 0, 0)),
      status: 'PENDING',
      notes: 'Première consultation'
    }
  })

  await prisma.reservation.create({
    data: {
      clientId: client2.id,
      treatmentId: treatment2.id,
      date: new Date(new Date().setHours(14, 30, 0, 0)),
      status: 'TREATED',
    }
  })

  // 4. Create Facture & Payments
  const facture1 = await prisma.facture.create({
    data: {
      clientId: client2.id,
      totalAmount: 800,
      status: 'PAID',
    }
  })

  await prisma.factureItem.create({
    data: {
      factureId: facture1.id,
      treatmentId: treatment2.id,
      quantity: 1,
      unitPrice: 800,
      total: 800,
    }
  })

  await prisma.reglement.create({
    data: {
      clientId: client2.id,
      factureId: facture1.id,
      amount: 800,
      paymentMethod: 'CARD',
    }
  })

  console.log('Database seeded successfully! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
