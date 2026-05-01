"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Download, LayoutDashboard, Home as HomeIcon } from "lucide-react";
import { FaYoutube, FaInstagram } from "react-icons/fa6";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "YouTube", href: "/youtube", icon: FaYoutube },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Resources", href: "/resources", icon: Download },
];


export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "glass-dark py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-110 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            AY
          </div>
          <span className="font-bold text-xl tracking-tighter">Ankit Yadav</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-all relative py-2",
                pathname === link.href 
                  ? "text-brand-primary" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary shadow-[0_0_10px_#f59e0b]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-dark border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 text-lg font-medium p-4 rounded-2xl transition-all",
                    pathname === link.href 
                      ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                      : "hover:bg-white/5 text-gray-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon size={20} className={pathname === link.href ? "text-brand-primary" : "text-gray-500"} />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
