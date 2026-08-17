import { PrismaClient } from '../../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let connectionString = process.env.SUPABASE_URL || process.env.DATABASE_URL || '';
// Clean up any pgbouncer=true because pg node driver doesn't understand it
if (connectionString.includes('pgbouncer=true')) {
  connectionString = connectionString.replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');
}

const pool = new Pool({ 
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
});
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
