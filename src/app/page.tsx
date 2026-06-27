"use client";
import { ArrowRight, Star, Clock, MapPin, Phone, ShieldCheck, Heart, Award, Quote } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function DiamondIcon({ size = 32 }: { size?: number }) {
  const half = size / 2;
  const inner = size * 0.22;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="text-[#a89f91]">
      <polygon points={`${half},1 ${size - 1},${half} ${half},${size - 1} 1,${half}`} stroke="currentColor" strokeWidth="1.5" fill="none" />
      <polygon points={`${half},${inner + 2} ${size - inner - 2},${half} ${half},${size - inner - 2} ${inner + 2},${half}`} fill="currentColor" opacity="0.3" />
    </svg>
  );
}

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  return (
    <div>
      {/* Section Héros */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/hero-image.jpg"
            alt="Soin visage clinique"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcfb]/95 via-[#fdfcfb]/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[#f4f1ed] text-[#8f8679] text-xs font-semibold tracking-widest uppercase mb-6">
              Esthétique Avancée
            </motion.span>
            <motion.h1 variants={fadeInUp} className="font-['Playfair_Display',serif] text-5xl md:text-7xl font-medium leading-tight mb-6 text-[#2a2826]">
              Révélez votre plus <br />
              <span className="italic text-[#a89f91]">belle peau.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#5a544c] mb-10 leading-relaxed font-light">
              Des soins esthétiques sur mesure adaptés à votre peau. Découvrez l'alliance parfaite entre expertise médicale et luxe apaisant.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/rendez-vous"
                className="bg-[#a89f91] hover:bg-[#8f8679] text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-md flex items-center justify-center gap-2"
              >
                Prendre Rendez-vous
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/soins"
                className="px-8 py-4 rounded-full border border-[#d4cfc7] text-[#5a544c] hover:bg-[#f4f1ed] text-base font-medium transition-all flex items-center justify-center"
              >
                Découvrir nos Soins
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section À Propos */}
      <section className="py-24 bg-[#f4f1ed] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="order-2 lg:order-1"
            >
              <motion.span variants={fadeInUp} className="text-[#a89f91] text-sm font-semibold tracking-widest uppercase mb-2 block">
                À Propos
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-['Playfair_Display',serif] text-4xl text-[#2a2826] mb-6">
                La Science de la Beauté
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#5a544c] text-lg mb-6 leading-relaxed font-light">
                Chez Diamond, nous pensons qu'une peau saine est le fondement de la véritable beauté. Notre clinique est dirigée par des dermatologues certifiés qui allient une profonde expertise médicale à un sens artistique de l'esthétique.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-[#5a544c] text-lg mb-8 leading-relaxed font-light">
                Nous adoptons une approche holistique et orientée résultats. Lors de votre consultation, nous utilisons une imagerie cutanée avancée pour élaborer un programme de soins personnalisé qui évolue avec vous.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 mb-10">
                {[
                  'Experts Dermatologues Certifiés',
                  'Technologies de Pointe Approuvées',
                  'Plans de Soins Personnalisés',
                  'Environnement Serein et Privé',
                ].map((item, i) => (
                  <motion.li variants={fadeInUp} key={i} className="flex items-center gap-3 text-[#333333]">
                    <div className="h-2 w-2 rounded-full bg-[#a89f91]" />
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/clinique"
                  className="inline-block px-8 py-4 rounded-full border border-[#a89f91] text-[#2a2826] hover:bg-[#a89f91] hover:text-white text-base font-medium transition-all"
                >
                  Rencontrer Notre Équipe
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1630835425197-50feeba99ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBtaW5pbWFsJTIwc3BhJTIwcm9vbXxlbnwxfHx8fDE3ODEzOTM5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Intérieur de la clinique"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 w-48 h-48 bg-white p-6 rounded-2xl shadow-xl hidden md:flex flex-col justify-center"
              >
                <div className="flex gap-1 text-[#a89f91] mb-2">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="font-['Playfair_Display',serif] text-3xl mb-1 text-[#2a2826]">4.9/5</p>
                <p className="text-sm text-[#6b645c] uppercase tracking-wider font-semibold">Note Patients</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Soins Vedettes */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#a89f91] text-sm font-semibold tracking-widest uppercase mb-2 block">
              Soins
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-['Playfair_Display',serif] text-4xl text-[#2a2826] mb-4">
              Soins Sélectionnés
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6b645c] text-lg font-light">
              Découvrez notre gamme de soins avancés conçus pour rajeunir, restaurer et sublimer votre beauté naturelle.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Soins du Visage Sur Mesure",
                desc: "Des soins profondément nettoyants et hydratants adaptés à vos besoins cutanés spécifiques.",
                img: "/soin-visage.jpg"
              },
              {
                title: "Injections & Fillers",
                desc: "Des améliorations subtiles avec des neuromodulateurs et des fillers dermiques premium pour un regard reposé.",
                img: "/soin-injections.jpg"
              },
              {
                title: "Thérapie Laser",
                desc: "Technologie lumineuse avancée ciblant la pigmentation, la rougeur et stimulant la production de collagène.",
                img: "/soin-laser.jpg"
              }
            ].map((service, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <h3 className="font-['Playfair_Display',serif] text-2xl mb-2 text-[#2a2826] group-hover:text-[#a89f91] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#6b645c] mb-4 font-light leading-relaxed">{service.desc}</p>
                <div className="flex items-center text-[#a89f91] font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Pourquoi Nous */}
      <section className="py-24 bg-[#fdfcfb] border-t border-[#e6e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#a89f91] text-sm font-semibold tracking-widest uppercase mb-2 block">
              Excellence
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-['Playfair_Display',serif] text-4xl text-[#2a2826] mb-4">
              Pourquoi Choisir Diamond ?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6b645c] text-lg font-light">
              Nous nous tenons aux plus hauts standards de sécurité, d'efficacité et de soin patient.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {[
              { icon: ShieldCheck, title: "Qualité Médicale", desc: "Soins et produits certifiés de niveau médical, approuvés par les autorités sanitaires." },
              { icon: Award, title: "Praticiens Experts", desc: "Dermatologues certifiés et praticiens hautement qualifiés à votre service." },
              { icon: () => <DiamondIcon size={32} />, title: "Résultats Naturels", desc: "Une approche conservatrice privilégiant des améliorations subtiles et naturelles." },
              { icon: Heart, title: "Soins Sur Mesure", desc: "Des programmes de soins conçus spécifiquement pour vos objectifs cutanés." }
            ].map((feature, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-[#f4f1ed] flex items-center justify-center text-[#a89f91] mb-6">
                  <feature.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Playfair_Display',serif] text-xl mb-3 text-[#2a2826]">{feature.title}</h3>
                <p className="text-[#6b645c] font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-24 bg-[#f4f1ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#a89f91] text-sm font-semibold tracking-widest uppercase mb-2 block">
              Témoignages
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-['Playfair_Display',serif] text-4xl text-[#2a2826] mb-4">
              Ce Que Disent Nos Patients
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                text: "L'équipe de Diamond a complètement transformé ma peau. Leur approche est si réfléchie, et les résultats sont incroyablement naturels. Je me sens enfin à l'aise sans maquillage.",
                name: "Sophie M.",
                treatment: "Soin Signature & Thérapie Laser"
              },
              {
                text: "J'étais anxieuse à l'idée de faire des injections pour la première fois, mais la praticienne m'a mis totalement à l'aise. Le résultat est subtil — exactement ce que je souhaitais.",
                name: "Émilie R.",
                treatment: "Injections Botox"
              },
              {
                text: "Entrer dans cette clinique, c'est comme pénétrer dans un spa de luxe, avec en plus la reassurance d'experts médicaux. Ma peau n'a jamais été aussi lumineuse.",
                name: "Isabelle T.",
                treatment: "Révision des Cicatrices d'Acné"
              }
            ].map((review, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="bg-white p-8 rounded-2xl shadow-sm relative">
                <Quote className="h-8 w-8 text-[#e6e2dd] absolute top-8 right-8" />
                <div className="flex gap-1 text-[#a89f91] mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-[#5a544c] font-light leading-relaxed mb-6">« {review.text} »</p>
                <div>
                  <p className="font-medium text-[#2a2826]">{review.name}</p>
                  <p className="text-sm text-[#8c847a]">{review.treatment}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-xl">
              <motion.span variants={fadeInUp} className="text-[#a89f91] text-sm font-semibold tracking-widest uppercase mb-2 block">
                Notre Univers
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-['Playfair_Display',serif] text-4xl text-[#2a2826]">
                Un Espace de Sérénité
              </motion.h2>
            </div>
            <motion.p variants={fadeInUp} className="text-[#6b645c] font-light md:text-right max-w-sm">
              Conçu pour apaiser les sens, notre clinique est un sanctuaire tranquille où la médecine avancée rencontre le luxe moderne.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <motion.div variants={fadeInUp} className="aspect-square rounded-xl overflow-hidden">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODEzNzUwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Intérieur de la clinique" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeInUp} className="aspect-square rounded-xl overflow-hidden">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMGNsaW5pYyUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3ODEzOTcyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Salle d'accueil" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden lg:block aspect-square rounded-xl overflow-hidden">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1vZGVybiUyMG1pbmltYWwlMjByb29tJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc4MTM5NzIxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Salle de soin" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bande Contact */}
      <section className="py-16 bg-[#f4f1ed] border-b border-[#e6e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#e6e2dd]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#a89f91] mb-4 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-['Playfair_Display',serif] text-xl mb-2 text-[#2a2826]">Adresse</h3>
              <p className="text-[#6b645c] font-light">Agadir, Maroc</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#a89f91] mb-4 shadow-sm">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-['Playfair_Display',serif] text-xl mb-2 text-[#2a2826]">Horaires</h3>
              <p className="text-[#6b645c] font-light">Lun–Ven : 9h – 18h<br />Sam : 10h – 16h</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#a89f91] mb-4 shadow-sm">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="font-['Playfair_Display',serif] text-xl mb-2 text-[#2a2826]">Contact</h3>
              <p className="text-[#6b645c] font-light">+212 6 65 38 50 51 | +212 5 25 41 09 61S<br />diamondskinclinic55@gmail.com</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

