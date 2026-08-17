"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckCircle,
  CreditCard,
  ArrowLeft,
  X,
  Menu,
  Clock,
  Bell,
} from "lucide-react";
import { DiamondLogo } from "@/lib/admin-data";
import { logoutAdmin } from "@/app/actions/auth";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Rendez-vous", icon: Calendar },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/treatments", label: "Soins", icon: CheckCircle },
  { href: "/admin/payments", label: "Paiements", icon: CreditCard },
];

function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col h-full"
      style={{ backgroundColor: "#1c1917", width: mobile ? "100%" : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-stone-800">
        <DiamondLogo size={18} />
        <div>
          <p className="text-white font-medium tracking-wide text-sm" style={{ fontFamily: '"Playfair Display", serif' }}>Diamond</p>
          <p className="text-stone-500 text-xs">Administration</p>
        </div>
        {mobile && onClose && (
          <button onClick={onClose} className="ml-auto text-stone-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-grow px-3 py-5 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 text-left rounded-sm"
              style={{
                backgroundColor: isActive ? "rgba(168,159,145,0.15)" : "transparent",
                color: isActive ? "#c8bfb4" : "#78716c",
              }}
            >
              <item.icon size={15} style={{ color: isActive ? "#a89f91" : "#78716c" }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-5 border-t border-stone-800">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-stone-500 hover:text-stone-300 transition-colors"
        >
          <ArrowLeft size={15} /> Retour au site
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const currentItem = navItems.find((item) => item.href === pathname);
  const pageTitle = currentItem ? currentItem.label : "Tableau de bord";

  return (
    <div
      className="flex h-screen overflow-hidden font-sans"
      style={{ backgroundColor: "#f8f6f3" }}
    >
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col flex-shrink-0" style={{ width: 240 }}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <Sidebar mobile onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow min-w-0 overflow-hidden text-stone-800">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-stone-100 flex-shrink-0">
          <button
            className="md:hidden text-stone-500 hover:text-stone-800 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-xs text-stone-400 uppercase tracking-widest">Tableau de bord</p>
            <h1 className="text-stone-800 font-semibold text-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
              {pageTitle}
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Date */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400 border border-stone-100 bg-[#f8f6f3] px-3 py-2">
              <Clock size={12} />
              Aujourd'hui
            </div>

            <button className="relative text-stone-400 hover:text-stone-700 transition-colors p-2">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#a89f91] rounded-full" />
            </button>

            {/* Admin avatar & Logout */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#a89f91] flex items-center justify-center text-white text-xs font-semibold">
                  BSH
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-stone-700">Dr Bouchera S H</p>
                  <p className="text-xs text-stone-400">Praticienne</p>
                </div>
              </div>
              <form action={logoutAdmin}>
                <button type="submit" className="text-xs text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors">
                  Quitter
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
