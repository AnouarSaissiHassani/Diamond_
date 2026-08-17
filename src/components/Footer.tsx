import Link from "next/link";

import { Gem } from "lucide-react";

function DiamondLogo({ size = 20 }: { size?: number }) {
  return <Gem size={size} className="text-[#a89f91]" />;
}

export default function Footer() {
  return (
    <footer className="bg-[#f4f1ed] pt-16 pb-8 border-t border-[#e6e2dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer CTA */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center border-b border-[#e6e2dd] pb-12 gap-6">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2a2826] max-w-lg">
            Votre beauté compte.<br />
            <span className="italic text-[#a89f91]">Contactez-nous aujourd'hui.</span>
          </h2>
          <Link
            href="/rendez-vous"
            className="bg-[#a89f91] hover:bg-[#8f8679] text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-md"
          >
            Prendre Rendez-vous
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <DiamondLogo size={18} />
              <span className="font-serif text-xl font-medium tracking-wide">
                Diamond Skin Clinic
              </span>
            </div>
            <p className="text-[#6b645c] text-sm leading-relaxed max-w-sm">
              Sublimer votre beauté naturelle grâce à des soins dermatologiques avancés, dans un environnement serein et luxueux.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><Link href="/soins" className="text-sm text-[#6b645c] hover:text-[#a89f91] transition-colors">Nos Soins</Link></li>
              <li><Link href="/#clinique" className="text-sm text-[#6b645c] hover:text-[#a89f91] transition-colors">Notre Clinique</Link></li>
              <li><Link href="/rendez-vous" className="text-sm text-[#6b645c] hover:text-[#a89f91] transition-colors">Rendez-vous</Link></li>
              <li><Link href="/galerie" className="text-sm text-[#6b645c] hover:text-[#a89f91] transition-colors">Galerie Avant/Après</Link></li>
              <li><Link href="/#faq" className="text-sm text-[#6b645c] hover:text-[#a89f91] transition-colors">FAQ</Link></li>
              <li><Link href="/admin" className="text-sm text-[#6b645c] hover:text-[#a89f91] transition-colors">Administration</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Nous Rendre Visite</h3>
            <address className="not-italic text-sm text-[#6b645c] space-y-2">
              <p>Agadir, Maroc</p>
              <p className="pt-2">diamondskinclinic55@gmail.com</p>
              <p>+212 6 65 38 50 51 | +212 5 25 41 09 61S</p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e6e2dd] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8c847a]">
            &copy; {new Date().getFullYear()} Diamond Skin Clinic. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[#8c847a] hover:text-[#a89f91]">IG</a>
            <a href="#" className="text-[#8c847a] hover:text-[#a89f91]">FB</a>
            <a href="#" className="text-[#8c847a] hover:text-[#a89f91]">TT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
