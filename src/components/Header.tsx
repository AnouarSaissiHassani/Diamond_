"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Gem } from "lucide-react";

function DiamondLogo({ size = 20 }: { size?: number }) {
  return <Gem size={size} className="text-[#a89f91]" />;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fdfcfb]/80 backdrop-blur-md border-b border-[#e6e2dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <DiamondLogo size={22} />
              <span className="font-serif text-2xl font-medium tracking-wide">
                Diamond
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium text-[#5a544c] hover:text-[#a89f91] transition-colors">
              Accueil
            </Link>
            <Link href="/soins" className="text-sm font-medium text-[#5a544c] hover:text-[#a89f91] transition-colors">
              Soins
            </Link>
            <Link href="/#clinique" className="text-sm font-medium text-[#5a544c] hover:text-[#a89f91] transition-colors">
              Notre Clinique
            </Link>
            <Link href="/galerie" className="text-sm font-medium text-[#5a544c] hover:text-[#a89f91] transition-colors">
              Galerie
            </Link>
            <Link href="/rendez-vous" className="text-sm font-medium text-[#5a544c] hover:text-[#a89f91] transition-colors">
              Contact
            </Link>
            <Link
              href="/rendez-vous"
              className="bg-[#a89f91] hover:bg-[#8f8679] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              Prendre Rendez-vous
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#5a544c] hover:text-[#a89f91] focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdfcfb] border-t border-[#e6e2dd]">
          <div className="px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#5a544c] hover:bg-[#f4f1ed] rounded-md">
              Accueil
            </Link>
            <Link href="/soins" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#5a544c] hover:bg-[#f4f1ed] rounded-md">
              Soins
            </Link>
            <Link href="/#clinique" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#5a544c] hover:bg-[#f4f1ed] rounded-md">
              Notre Clinique
            </Link>
            <Link href="/galerie" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#5a544c] hover:bg-[#f4f1ed] rounded-md">
              Galerie
            </Link>
            <Link href="/rendez-vous" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#5a544c] hover:bg-[#f4f1ed] rounded-md">
              Contact
            </Link>
            <div className="pt-4 px-3">
              <Link href="/rendez-vous" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-[#a89f91] hover:bg-[#8f8679] text-white px-4 py-3 rounded-full text-sm font-medium transition-colors shadow-sm">
                Prendre Rendez-vous
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
