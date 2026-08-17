import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "fallback_secret_diamond_clinic_2026_super_secure_string",
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Obtenir l'IP de manière sécurisée (req.headers peut ne pas avoir la méthode get)
        let ip = "unknown-ip";
        if (req?.headers && typeof req.headers.get === 'function') {
          ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown-ip";
        }
        
        // Autoriser 5 requêtes par fenêtre de 1 minute
        const { success } = rateLimit(ip, 5, 60000);
        
        if (!success) {
          throw new Error("Trop de tentatives de connexion. Veuillez réessayer plus tard.");
        }

        if (!credentials?.email || !credentials?.password) return null

        // Check against env variables for default admin
        const adminPassword = process.env.ADMIN_PASSWORD || "diamond2026";
        if (
          credentials.email === "admin@diamondclinic.com" &&
          credentials.password === adminPassword
        ) {
          return { id: "admin", email: "admin@diamondclinic.com", name: "Admin" }
        }

        // Otherwise check database
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })

          if (!user || !user.password) return null

          const isValid = await bcrypt.compare(credentials.password as string, user.password)
          if (!isValid) return null

          return { id: user.id, email: user.email, name: user.name }
        } catch (error) {
          console.error("Database error during login:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
})
