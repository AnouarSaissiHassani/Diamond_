"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const galleryItems = [
  {
    id: 1,
    title: "Soin Hydrafacial",
    description: "Nettoyage en profondeur, extraction des impuretés et hydratation intense pour un teint lumineux et purifié.",
    beforeImg: "/hydrafacial-avant.png",
    afterImg: "/hydrafacial-apres.png",
  },
  {
    id: 2,
    title: "Microneedling",
    description: "Stimulation de la production de collagène pour estomper les cicatrices, resserrer les pores et lisser le grain de peau.",
    beforeImg: "/microneedling-avant.png",
    afterImg: "/microneedling-apres.png",
  },
  {
    id: 3,
    title: "Injections des Lèvres",
    description: "Redéfinition du contour et augmentation naturelle du volume pour des lèvres pulpeuses et harmonieuses.",
    beforeImg: "/levres-avant.png",
    afterImg: "/levres-apres.png",
  },
  {
    id: 4,
    title: "Rehaussement de Cils",
    description: "Courbure naturelle et allongement des cils pour un regard ouvert et sublimé dès le réveil.",
    beforeImg: "/cils-avant.png",
    afterImg: "/cils-apres.png",
  }
];

export default function Galerie() {
  return (
    <div style={{ backgroundColor: "#faf8f5" }}>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "45vh", minHeight: 340 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxhZXN0aGV0aWMlMjBzcGF8ZW58MHx8fHwxNzgxNDUwMTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Galerie Avant/Après"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(18,12,8,0.55)" }} />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            className="text-stone-300 uppercase"
            style={{ fontSize: 10, letterSpacing: "0.45em", marginBottom: 16 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Résultats Cliniques
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
            Galerie Avant / Après
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="w-10 h-px bg-stone-400/50" />
            <div className="flex items-center gap-3 text-stone-400" style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              <Link href="/" className="hover:text-stone-200 transition-colors">Accueil</Link>
              <span className="text-stone-600">·</span>
              <span className="text-stone-200">Galerie</span>
            </div>
            <div className="w-10 h-px bg-stone-400/50" />
          </motion.div>
        </div>
      </section>

      {/* ── GALERIE ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-['Playfair_Display',serif] text-4xl text-[#2a2826] mb-6">
              L'Art de la Transformation
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6b645c] text-lg font-light leading-relaxed">
              Découvrez les résultats réels de nos patients. Chaque traitement est personnalisé pour révéler la beauté naturelle tout en respectant l'harmonie de votre visage.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {galleryItems.map((item) => (
              <motion.div variants={fadeInUp} key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e7e5e4]">
                {/* Images Container */}
                <div className="flex w-full h-[350px] relative">
                  {/* Avant */}
                  <div className="w-1/2 relative group overflow-hidden">
                    <img 
                      src={item.beforeImg} 
                      alt={`Avant - ${item.title}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(15%)" }}
                    />
                    <div className="absolute inset-0 bg-black/5" />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest rounded-full text-stone-700 shadow-sm">
                      Avant
                    </span>
                  </div>
                  
                  {/* Divider line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white z-10 transform -translate-x-1/2 shadow-lg" />
                  <div className="absolute left-1/2 top-1/2 w-8 h-8 bg-white rounded-full z-20 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg border border-[#f4f1ed]">
                    <ArrowRight size={14} className="text-[#a89f91]" />
                  </div>

                  {/* Après */}
                  <div className="w-1/2 relative group overflow-hidden">
                    <img 
                      src={item.afterImg} 
                      alt={`Après - ${item.title}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest rounded-full text-[#a89f91] shadow-sm">
                      Après
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-['Playfair_Display',serif] text-2xl mb-3 text-[#2a2826]">
                    {item.title}
                  </h3>
                  <p className="text-[#6b645c] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#f4f1ed] border-t border-[#e6e2dd]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#2a2826] mb-6">
              Prêt(e) pour votre propre transformation ?
            </h2>
            <p className="text-[#6b645c] text-lg mb-10 font-light max-w-2xl mx-auto">
              Prenez rendez-vous dès aujourd'hui pour une consultation personnalisée. Notre équipe d'experts établira un protocole sur-mesure adapté à votre peau.
            </p>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center justify-center gap-3 bg-[#a89f91] hover:bg-[#8f8679] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all shadow-md"
            >
              Réserver ma consultation
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
