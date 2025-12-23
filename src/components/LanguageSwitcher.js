"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  const handleChange = () => {
    toggleLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <button
      onClick={handleChange}
      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {language === "en" ? "العربية" : "English"}
    </button>
  );
}
