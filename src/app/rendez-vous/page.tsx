import { prisma } from "@/lib/prisma";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export default async function RendezVous() {
  const treatments = await prisma.treatment.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div style={{ backgroundColor: "#faf8f5" }}>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "45vh", minHeight: 340 }}>
        <div className="absolute inset-0">
          <img
            src="/figma_hero.jpg"
            alt="Prendre rendez-vous"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(18,12,8,0.65)" }} />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            className="text-stone-300 uppercase"
            style={{ fontSize: 10, letterSpacing: "0.45em", marginBottom: 16 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Diamond Skin Clinic
          </motion.p>

          <motion.h1
            className="text-white"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            Prendre Rendez-vous
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="w-10 h-px bg-stone-400/50" />
            <div className="flex items-center gap-3 text-stone-400" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
              <Link href="/" className="hover:text-stone-200 transition-colors">Accueil</Link>
              <span className="text-stone-600">·</span>
              <span className="text-stone-200">Rendez-vous</span>
            </div>
            <div className="w-10 h-px bg-stone-400/50" />
          </motion.div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* LEFT: Contact info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="text-stone-400 uppercase mb-3"
                style={{ fontSize: 10, letterSpacing: "0.38em" }}
              >
                Nous Contacter
              </p>
              <h2
                className="text-stone-800 mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  lineHeight: 1.15,
                }}
              >
                Rencontrons-nous<br />à Agadir
              </h2>
              <p className="text-stone-500 leading-relaxed mb-10" style={{ fontSize: "0.9375rem" }}>
                Chaque soin commence par un échange. Remplissez le formulaire et notre équipe vous contactera sous 24 heures pour confirmer votre rendez-vous.
              </p>

              <div className="space-y-7">
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: 44, height: 44, border: "1px solid #e7e5e4", backgroundColor: "white" }}
                  >
                    <MapPin size={16} className="text-[#a89f91]" />
                  </div>
                  <div>
                    <p className="text-stone-400 uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.3em" }}>Adresse</p>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      Agadir, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: 44, height: 44, border: "1px solid #e7e5e4", backgroundColor: "white" }}
                  >
                    <Phone size={16} className="text-[#a89f91]" />
                  </div>
                  <div>
                    <p className="text-stone-400 uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.3em" }}>Téléphone</p>
                    <p className="text-stone-700 text-sm">+212 6 65 38 50 51 | +212 5 25 41 09 61S</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: 44, height: 44, border: "1px solid #e7e5e4", backgroundColor: "white" }}
                  >
                    <Mail size={16} className="text-[#a89f91]" />
                  </div>
                  <div>
                    <p className="text-stone-400 uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.3em" }}>Email</p>
                    <p className="text-stone-700 text-sm">diamondskinclinic55@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: 44, height: 44, border: "1px solid #e7e5e4", backgroundColor: "white" }}
                  >
                    <Clock size={16} className="text-[#a89f91]" />
                  </div>
                  <div>
                    <p className="text-stone-400 uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.3em" }}>Horaires</p>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      Lun – Ven : 9h – 18h<br />Sam : 10h – 16h<br />Dim : Fermé
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative diamond divider */}
              <div className="flex items-center gap-4 mt-12">
                <div className="flex-grow h-px bg-stone-200" />
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <polygon points="7,0.5 13.5,7 7,13.5 0.5,7" stroke="#a89f91" strokeWidth="1" fill="none" />
                  <polygon points="7,3 11,7 7,11 3,7" fill="#a89f91" opacity="0.3" />
                </svg>
                <div className="flex-grow h-px bg-stone-200" />
              </div>

              <p className="text-stone-400 mt-6 text-xs leading-relaxed">
                Une consultation initiale de 30 minutes est offerte pour tout nouveau patient afin d'évaluer vos besoins et vous proposer un programme personnalisé.
              </p>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BookingForm treatments={treatments} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section>
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="flex-grow h-px bg-stone-200" />
              <p
                className="text-stone-400 uppercase flex-shrink-0"
                style={{ fontSize: 10, letterSpacing: "0.38em" }}
              >
                Nous Trouver
              </p>
              <div className="flex-grow h-px bg-stone-200" />
            </div>

            <div className="overflow-hidden" style={{ height: 480, border: "1px solid #e7e5e4" }}>
              <iframe
                title="Diamond Skin Clinic – Agadir"
                src="https://maps.google.com/maps?q=Agadir+Maroc&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="480"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address tag below map */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5"
              style={{ backgroundColor: "white", border: "1px solid #e7e5e4", borderTop: "none" }}
            >
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-[#a89f91] flex-shrink-0" />
                <p className="text-stone-600 text-sm">
                  <span style={{ fontFamily: '"Playfair Display", serif' }}>Diamond Skin Clinic</span>
                  &ensp;—&ensp;Agadir, Maroc
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Agadir+Maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#a89f91] hover:text-stone-800 transition-colors flex-shrink-0"
                style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Ouvrir dans Maps <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom padding */}
      <div className="pb-16" />
    </div>
  );
}

