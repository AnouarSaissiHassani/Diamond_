"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";


const treatments = [
  {
    id: 1,
    title: "Soin Signature",
    category: "Visage",
    duration: "90 min",
    price: "À partir de €180",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    description:
      "Notre soin signature débute par une consultation approfondie pour comprendre les besoins uniques de votre peau, suivie d'un protocole sur mesure en plusieurs étapes utilisant uniquement les meilleures formulations de qualité médicale.",
    benefits: [
      "Hydratation & nutrition en profondeur",
      "Affinement des pores",
      "Teint unifié",
      "Teint radieux et lumineux",
    ],
  },
  {
    id: 2,
    title: "Peeling Chimique",
    category: "Visage",
    duration: "60 min",
    price: "À partir de €150",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
    description:
      "Un soin de resurfaçage soigneusement calibré utilisant des acides de qualité pharmaceutique pour renouveler la surface cutanée, ciblant la pigmentation, les ridules et les irrégularités de texture.",
    benefits: [
      "Renouvellement cellulaire accéléré",
      "Correction de la pigmentation",
      "Texture lissée",
      "Teint éclairci",
    ],
  },
  {
    id: 3,
    title: "Microneedling",
    category: "Avancé",
    duration: "75 min",
    price: "À partir de €250",
    image:
      "https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?auto=format&fit=crop&w=800&q=80",
    description:
      "La thérapie de stimulation du collagène par précision active la réponse régénératrice naturelle de votre peau, réduisant efficacement les cicatrices, le relâchement et les signes visibles du vieillissement.",
    benefits: [
      "Stimulation du collagène",
      "Réduction des cicatrices",
      "Minimisation des pores",
      "Raffermissement cutané",
    ],
  },
  {
    id: 4,
    title: "Resurfaçage Laser",
    category: "Avancé",
    duration: "60 min",
    price: "À partir de €350",
    image:
      "https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=800&q=80",
    description:
      "La technologie laser fractionné cible avec précision les cellules cutanées endommagées tout en préservant les tissus environnants, accélérant la régénération naturelle pour des résultats spectaculaires et naturels.",
    benefits: [
      "Réduction des rides",
      "Correction des dommages solaires",
      "Raffermissement cutané",
      "Affinement des pores",
    ],
  },
  {
    id: 5,
    title: "Injections Fillers",
    category: "Avancé",
    duration: "45 min",
    price: "À partir de €300",
    image:
      "https://images.unsplash.com/photo-1761718209852-54ca4210183e?auto=format&fit=crop&w=800&q=80",
    description:
      "Des fillers à l'acide hyaluronique de qualité médicale, placés avec précision pour restaurer le volume, définir les contours et rajeunir votre apparence avec des résultats beaux et naturels.",
    benefits: [
      "Restauration du volume",
      "Définition des contours",
      "Résultats immédiats",
      "Effets durables",
    ],
  },
  {
    id: 6,
    title: "Luminothérapie LED",
    category: "Visage",
    duration: "45 min",
    price: "À partir de €90",
    image:
      "https://images.unsplash.com/photo-1761718209835-c8586b7dcac0?auto=format&fit=crop&w=800&q=80",
    description:
      "Une thérapie photobiomodulatrice avancée utilisant des longueurs d'onde cliniquement éprouvées pour traiter un large éventail de préoccupations cutanées, des éruptions actives à la récupération post-soin.",
    benefits: [
      "Réduction de l'acné",
      "Anti-inflammatoire",
      "Cicatrisation améliorée",
      "Régénération cutanée",
    ],
  },
  {
    id: 7,
    title: "Dermaplaning",
    category: "Visage",
    duration: "45 min",
    price: "À partir de €85",
    image:
      "https://images.unsplash.com/photo-1731514771613-991a02407132?auto=format&fit=crop&w=800&q=80",
    description:
      "Une technique d'exfoliation manuelle douce qui élimine les cellules mortes et le duvet, révélant instantanément une peau plus lisse et améliorant considérablement l'absorption des soins.",
    benefits: [
      "Douceur instantanée",
      "Absorption améliorée",
      "Teint plus lumineux",
      "Fini parfait pour le maquillage",
    ],
  },
  {
    id: 8,
    title: "HydraFacial",
    category: "Visage",
    duration: "60 min",
    price: "À partir de €120",
    image:
      "https://images.unsplash.com/photo-1647004692483-c5d942fe1137?auto=format&fit=crop&w=800&q=80",
    description:
      "Le soin hydratant multi-étapes ultime qui nettoie, exfolie, extrait et infuse la peau de sérums puissants en une séance profondément indulgente.",
    benefits: [
      "Nettoyage en profondeur",
      "Hydratation intense",
      "Élimination des impuretés",
      "Peau rebondie et souple",
    ],
  },
  {
    id: 9,
    title: "Sculpture Corporelle",
    category: "Corps",
    duration: "60 min",
    price: "À partir de €200",
    image:
      "https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?auto=format&fit=crop&w=800&q=80",
    description:
      "La technologie de remodelage non invasive cible avec précision les dépôts graisseux tenaces et resserre la peau, sculptant votre silhouette naturelle sans aucun temps de récupération.",
    benefits: [
      "Réduction des graisses",
      "Raffermissement cutané",
      "Définition des contours",
      "Aucune éviction",
    ],
  },
];


function SimpleAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.08 }}
          className="border bg-white"
          style={{ borderColor: "#e7e5e4", paddingLeft: 24, paddingRight: 24 }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full py-5 text-left text-stone-800 flex justify-between items-center hover:text-stone-600 transition-colors"
            style={{ fontSize: "0.875rem", letterSpacing: "0.01em" }}
          >
            {faq.question}
            <span>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="pb-5 text-stone-500 leading-relaxed" style={{ fontSize: "0.875rem" }}>
              {faq.answer}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

const faqs = [
  {
    question: "Comment savoir quel soin me convient le mieux ?",
    answer:
      "Chaque parcours Diamond commence par une consultation cutanée approfondie avec l'un de nos praticiens experts. Nous évaluons la santé de votre peau, discutons de vos préoccupations et des résultats souhaités, et créons un protocole de soin sur mesure, conçu spécifiquement pour vous.",
  },
  {
    question: "Combien de séances seront nécessaires ?",
    answer:
      "Cela varie selon le soin et chaque individu. De nombreux clients constatent des résultats dès la première séance, tandis que d'autres bénéficient d'une cure de 3 à 6 séances pour des résultats optimaux et durables. Nous formulons une recommandation claire à l'issue de votre consultation initiale.",
  },
  {
    question: "Y a-t-il une période de récupération après les soins ?",
    answer:
      "La plupart de nos soins nécessitent peu ou pas de temps de récupération. Les procédures avancées comme le resurfaçage laser ou le microneedling peuvent entraîner 24 à 72 heures de légères rougeurs. Nous vous informerons toujours pleinement de ce à quoi vous attendre avant votre rendez-vous.",
  },
  {
    question: "Vos soins conviennent-ils à tous les types de peau ?",
    answer:
      "Nous proposons des soins adaptés à tous les types et tonalités de peau. Nos praticiens sont formés pour traiter des peaux variées et personnaliseront toujours les protocoles pour garantir la sécurité et l'efficacité pour votre teint spécifique.",
  },
  {
    question: "Comment me préparer pour mon rendez-vous ?",
    answer:
      "Nous recommandons d'arriver avec une peau propre, d'éviter les rétinoïdes dans les 48 heures précédant le soin, et d'appliquer quotidiennement un SPF dans la semaine précédant votre visite. Les consignes de préparation complètes sont communiquées au moment de la réservation.",
  },
];

const FILTERS = ["Tous", "Visage", "Corps", "Avancé"];

// Diamond grid: 3×3 staggered layout, 120px containers, ~170px visual size
// Container dimensions: 645 × 375 px
// Positions are top-left of each 120×120 diamond container
const DESKTOP_POSITIONS = [
  { x: 25, y: 25 },   // row 0
  { x: 215, y: 25 },
  { x: 405, y: 25 },
  { x: 120, y: 120 }, // row 1
  { x: 310, y: 120 },
  { x: 500, y: 120 },
  { x: 25, y: 215 },  // row 2
  { x: 215, y: 215 },
  { x: 405, y: 215 },
];

function DiamondCard({
  treatment,
  position,
  index,
}: {
  treatment: (typeof treatments)[0];
  position: { x: number; y: number };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: position.x, top: position.y, width: 120, height: 120 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.65 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Rotated container — clips to diamond shape */}
      <div
        className="w-full h-full overflow-hidden relative"
        style={{ transform: "rotate(45deg)" }}
      >
        {/* Counter-rotated image — appears upright inside diamond */}
        <motion.div
          className="w-full h-full"
          style={{ transformOrigin: "center" }}
          initial={{ rotate: -45, scale: 1.42 }}
          animate={{ rotate: -45, scale: hovered ? 1.65 : 1.42 }}
          transition={{
            scale: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
            rotate: { duration: 0 },
          }}
        >
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(10, 7, 4, 0.58)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Counter-rotate text to appear upright */}
          <div
            style={{ transform: "rotate(-45deg)", textAlign: "center" }}
            className="px-1"
          >
            <p
              style={{
                color: "rgba(220, 200, 175, 0.85)",
                fontSize: 7,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {treatment.category}
            </p>
            <p
              style={{
                color: "#f7f0e6",
                fontFamily: '"Playfair Display", serif',
                fontSize: 11,
                lineHeight: 1.35,
                fontStyle: "italic",
              }}
            >
              {treatment.title}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Soins() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredTreatments =
    activeFilter === "Tous"
      ? treatments
      : treatments.filter((t) => t.category === activeFilter);

  return (
    <div style={{ backgroundColor: "#faf8f5" }}>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "55vh", minHeight: 400 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=80"
            alt="Treatments hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(20,14,10,0.62)" }} />
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
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              letterSpacing: "-0.01em",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            Nos Soins
          </motion.h1>

          {/* Decorative rule */}
          <motion.div
            className="flex items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="w-10 h-px bg-stone-400/50" />
            <div className="flex items-center gap-3 text-stone-400" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
              <Link href="/" className="hover:text-stone-200 transition-colors duration-300">
                Accueil
              </Link>
              <span className="text-stone-600">·</span>
              <span className="text-stone-200">Soins</span>
            </div>
            <div className="w-10 h-px bg-stone-400/50" />
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.p
            className="text-stone-400 uppercase"
            style={{ fontSize: 10, letterSpacing: "0.38em", marginBottom: 18 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Soins Sur Mesure
          </motion.p>

          <motion.h2
            className="text-stone-800"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              marginBottom: 20,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            La Science Rencontre la Sérénité
          </motion.h2>

          <motion.p
            className="text-stone-500 leading-relaxed"
            style={{ fontSize: "0.9375rem" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Chez Diamond, chaque soin est une fusion de précision médicale et
            d'indulgence sensorielle. Nos praticiens experts élaborent des
            protocoles personnalisés à l'aide des meilleures formulations —
            offrant des résultats à la fois transformateurs et durables.
          </motion.p>
        </div>
      </section>

      {/* ── DIAMOND GRID ── */}
      <section className="pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            className="text-center text-stone-400 uppercase mb-14"
            style={{ fontSize: 9, letterSpacing: "0.38em" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Survolez pour explorer
          </motion.p>

          {/* Desktop: absolutely positioned diamond grid */}
          <div className="hidden md:flex justify-center">
            <div style={{ position: "relative", width: 645, height: 375 }}>
              {treatments.map((treatment, i) => (
                <DiamondCard
                  key={treatment.id}
                  treatment={treatment}
                  position={DESKTOP_POSITIONS[i]}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Mobile: 3-column grid with diamond shapes */}
          <div className="grid grid-cols-3 gap-6 md:hidden">
            {treatments.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    transform: "rotate(45deg)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "rotate(-45deg) scale(1.42)",
                      transformOrigin: "center",
                    }}
                  />
                </div>
                <p
                  className="text-center text-stone-400 uppercase mt-3"
                  style={{ fontSize: 8, letterSpacing: "0.2em" }}
                >
                  {treatment.category}
                </p>
                <p
                  className="text-center text-stone-800 mt-1"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "0.6875rem",
                    lineHeight: 1.3,
                  }}
                >
                  {treatment.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Treatment name strip (desktop only) */}
          <motion.p
            className="hidden md:block text-center text-stone-400 mt-14"
            style={{ fontSize: 10, letterSpacing: "0.18em" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {treatments.map((t, i) => (
              <span key={t.id}>
                <span className="text-stone-600">{t.title}</span>
                {i < treatments.length - 1 && (
                  <span className="text-stone-300 mx-3">·</span>
                )}
              </span>
            ))}
          </motion.p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-stone-200" />
      </div>

      {/* ── TREATMENT CARDS GRID ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header + filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-stone-400 uppercase mb-3"
                style={{ fontSize: 10, letterSpacing: "0.38em" }}
              >
                Tous les Soins
              </p>
              <h2
                className="text-stone-800"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                }}
              >
                Découvrir Notre Menu
              </h2>
            </motion.div>

            <motion.div
              className="flex gap-2 flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="px-5 py-2 border transition-all duration-300"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    backgroundColor:
                      activeFilter === filter ? "#292524" : "transparent",
                    color:
                      activeFilter === filter ? "#faf8f5" : "#78716c",
                    borderColor:
                      activeFilter === filter ? "#292524" : "#d6d3d1",
                    cursor: "pointer",
                  }}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTreatments.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                layout
              >
                <div className="overflow-hidden mb-5" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <p
                  className="text-stone-400 uppercase mb-2"
                  style={{ fontSize: 9, letterSpacing: "0.3em" }}
                >
                  {treatment.category}
                </p>

                <h3
                  className="text-stone-800 mb-3"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "1.125rem",
                  }}
                >
                  {treatment.title}
                </h3>

                <p
                  className="text-stone-500 leading-relaxed mb-5"
                  style={{
                    fontSize: "0.875rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {treatment.description}
                </p>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid #e7e5e4" }}
                >
                  <div className="flex items-center gap-1.5 text-stone-400" style={{ fontSize: "0.75rem" }}>
                    <Clock size={11} />
                    <span>{treatment.duration}</span>
                  </div>
                  <span className="text-stone-600" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    {treatment.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED HIGHLIGHT — Soin Signature ── */}
      <section className="py-24" style={{ backgroundColor: "#f5f2ee" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
                alt="Soin Signature"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p
                className="text-stone-400 uppercase mb-4"
                style={{ fontSize: 10, letterSpacing: "0.38em" }}
              >
                Soin Signature
              </p>

              <h2
                className="text-stone-800 mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                }}
              >
                Le Soin Signature<br />Diamond
              </h2>

              <p className="text-stone-500 leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
                {treatments[0].description} Élaboré par nos praticiens principaux,
                c'est l'expérience Diamond par excellence — un voyage sensoriel
                qui laisse votre peau visiblement renouvelée et profondément nourrie.
              </p>

              <ul className="space-y-3 mb-10">
                {treatments[0].benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-600" style={{ fontSize: "0.875rem" }}>
                    <div className="w-4 h-px bg-stone-400 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6 mb-10">
                <div>
                  <p
                    className="text-stone-400 uppercase mb-1"
                    style={{ fontSize: 9, letterSpacing: "0.3em" }}
                  >
                    Durée
                  </p>
                  <p className="text-stone-700" style={{ fontSize: "0.875rem" }}>
                    90 minutes
                  </p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: "#d6d3d1" }} />
                <div>
                  <p
                    className="text-stone-400 uppercase mb-1"
                    style={{ fontSize: 9, letterSpacing: "0.3em" }}
                  >
                    Tarif
                  </p>
                  <p className="text-stone-700" style={{ fontSize: "0.875rem" }}>
                    À partir de €180
                  </p>
                </div>
              </div>

              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-3 px-8 py-4 text-white hover:bg-stone-700 transition-colors duration-300"
                style={{
                  backgroundColor: "#292524",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Réserver ce Soin
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECOND FEATURED — Microneedling (reversed) ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text (left on desktop) */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p
                className="text-stone-400 uppercase mb-4"
                style={{ fontSize: 10, letterSpacing: "0.38em" }}
              >
                Soin Avancé
              </p>

              <h2
                className="text-stone-800 mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                }}
              >
                Microneedling<br />de Précision
              </h2>

              <p className="text-stone-500 leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
                {treatments[2].description} Avec un inconfort minimal et
                des résultats exceptionnels, ce soin représente le summum
                de l'esthétique régénératrice.
              </p>

              <ul className="space-y-3 mb-10">
                {treatments[2].benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-600" style={{ fontSize: "0.875rem" }}>
                    <div className="w-4 h-px bg-stone-400 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6 mb-10">
                <div>
                  <p className="text-stone-400 uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.3em" }}>Durée</p>
                  <p className="text-stone-700" style={{ fontSize: "0.875rem" }}>75 minutes</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: "#d6d3d1" }} />
                <div>
                  <p className="text-stone-400 uppercase mb-1" style={{ fontSize: 9, letterSpacing: "0.3em" }}>Tarif</p>
                  <p className="text-stone-700" style={{ fontSize: "0.875rem" }}>À partir de €250</p>
                </div>
              </div>

              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-3 px-8 py-4 text-white hover:bg-stone-700 transition-colors duration-300"
                style={{
                  backgroundColor: "#292524",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Réserver ce Soin
                <ArrowRight size={13} />
              </Link>
            </motion.div>

            {/* Image (right on desktop) */}
            <motion.div
              className="overflow-hidden order-1 lg:order-2"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <img
                src="https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?auto=format&fit=crop&w=900&q=80"
                alt="Microneedling"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f5f2ee" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.p
              className="text-stone-400 uppercase mb-4"
              style={{ fontSize: 10, letterSpacing: "0.38em" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Comment Ça Fonctionne
            </motion.p>
            <motion.h2
              className="text-stone-800"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Votre Parcours de Soin
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute h-px"
              style={{
                top: 32,
                left: "13%",
                right: "13%",
                backgroundColor: "#e7e5e4",
              }}
            />

            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Une évaluation cutanée approfondie avec l'un de nos praticiens experts pour comprendre votre peau et vos objectifs.",
              },
              {
                step: "02",
                title: "Programme de Soin",
                desc: "Un protocole sur mesure élaboré spécifiquement autour des besoins de votre peau et des résultats souhaités.",
              },
              {
                step: "03",
                title: "Votre Séance",
                desc: "Une expérience de soin indulgente réalisée avec précision, attention et les meilleures formulations.",
              },
              {
                step: "04",
                title: "Suivi Post-Soin",
                desc: "Des conseils post-traitement personnalisés et un programme de soins à domicile pour prolonger et optimiser vos résultats.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.14 }}
              >
                <div
                  className="flex items-center justify-center mx-auto mb-6 relative z-10"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "1px solid #d6d3d1",
                    backgroundColor: "#f5f2ee",
                  }}
                >
                  <span
                    className="text-stone-400"
                    style={{ fontSize: 11, letterSpacing: "0.2em" }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3
                  className="text-stone-800 mb-3"
                  style={{ fontFamily: '"Playfair Display", serif', fontSize: "1.0625rem" }}
                >
                  {item.title}
                </h3>
                <p className="text-stone-500 leading-relaxed" style={{ fontSize: "0.875rem" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <motion.p
              className="text-stone-400 uppercase mb-4"
              style={{ fontSize: 10, letterSpacing: "0.38em" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Questions & Réponses
            </motion.p>
            <motion.h2
              className="text-stone-800"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Questions Fréquentes
            </motion.h2>
          </div>

          <SimpleAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=1600&q=80"
            alt="Prendre rendez-vous"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(12,8,5,0.72)" }}
          />
        </div>

        <div className="relative max-w-2xl mx-auto text-center px-6">
          <motion.p
            className="text-stone-300 uppercase mb-5"
            style={{ fontSize: 10, letterSpacing: "0.42em" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Commencez Votre Voyage
          </motion.p>

          <motion.h2
            className="text-white mb-6"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Votre Plus Belle Peau<br />Vous Attend
          </motion.h2>

          <motion.p
            className="text-stone-300 leading-relaxed mb-11"
            style={{ fontSize: "0.9375rem" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Prenez rendez-vous pour une consultation gratuite avec l'un de nos
            praticiens experts et franchissez le premier pas vers la peau dont
            vous avez toujours rêvé.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-3 px-10 py-4 text-white transition-all duration-400 hover:bg-white hover:text-stone-900"
              style={{
                border: "1px solid rgba(255,255,255,0.45)",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Prendre Rendez-vous
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
