"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageProvider";
import { clsx } from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { language } = useLanguage();
  const t = (en, ar) => (language === "en" ? en : ar);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white text-black dark:bg-gray-900 dark:text-white"
          : "bg-transparent text-black dark:text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Economic Platform
        </Link>

        
        <ul className="hidden md:flex space-x-6 font-medium items-center hover:text-red-800">
          <li><Link href="/">{language === "ar" ? "الرئيسية" : "Home"}</Link></li>

          <li className="relative">
            <div
              onMouseEnter={() => setShowSubmenu(true)}
              onMouseLeave={() => setShowSubmenu(false)}
              className="relative"
            >
              <div className="cursor-pointer flex items-center gap-1 hover:text-red-700">
                {language === "ar" ? "القطاعات" : "Sectors"}
                {showSubmenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {showSubmenu && (
                <ul className="absolute top-full left-0 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg w-48 z-50 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sectors/education">{language === "ar" ? "التعليم" : "Education"}</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sectors/health">{language === "ar" ? "الصحة" : "Health"}</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/sectors/transport">{language === "ar" ? "النقل" : "Transport"}</Link>
                  </li>
                </ul>
              )}
            </div>
          </li>

          <li className="hover:text-red-700"><Link href="/reports">{language === "ar" ? "التقارير" : "Reports"}</Link></li>
          <li className="hover:text-red-700"><Link href="#contact">{language === "ar" ? "اتصل بنا" : "Contact Us"}</Link></li>

          
          <li><ThemeToggle /></li>
          <li><LanguageSwitcher /></li>
        </ul>

        {/* Mobile Menu  */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-4 space-y-4 shadow-lg">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>{language === "ar" ? "الرئيسية" : "Home"}</Link></li>

          <li>
            <button
              className="w-full text-left flex items-center gap-1"
              onClick={() => setShowSubmenu(!showSubmenu)}
            >
              {language === "ar" ? "القطاعات" : "Sectors"}
              {showSubmenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showSubmenu && (
              <ul className="mt-2 pl-4 text-sm space-y-2">
                <li><Link href="/sectors/education" onClick={() => setMenuOpen(false)}>{language === "ar" ? "التعليم" : "Education"}</Link></li>
                <li><Link href="/sectors/health" onClick={() => setMenuOpen(false)}>{language === "ar" ? "الصحة" : "Health"}</Link></li>
                <li><Link href="/sectors/transport" onClick={() => setMenuOpen(false)}>{language === "ar" ? "النقل" : "Transport"}</Link></li>
              </ul>
            )}
          </li>

          <li><Link href="/reports" onClick={() => setMenuOpen(false)}>{language === "ar" ? "التقارير" : "Reports"}</Link></li>
          <li><Link href="#contact" onClick={() => setMenuOpen(false)}>{language === "ar" ? "اتصل بنا" : "Contact"}</Link></li>

          {/* Mobile controls */}
          <li className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </li>
        </ul>
      )}
    </nav>
  );
}
