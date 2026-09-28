import { PrismaClient } from '../../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let connectionString = process.env.SUPABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
// Clean up pgbouncer=true and force port 5432 (Session pooler) because pg driver requires prepared statements
// which the Supabase transaction pooler (6543) does not support.
if (connectionString.includes('supabase.com')) {
  connectionString = connectionString.replace(':6543', ':5432');
  connectionString = connectionString.replace('?pgbouncer=true', '').replace('&pgbouncer=true', '');
}

const pool = new Pool({ 
  connectionString,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
});
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
