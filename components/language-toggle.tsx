"use client"

import { useLanguage } from "@/lib/language-context"

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
        className="bg-black text-brutal-red font-sans text-[10px] tracking-widest px-4 py-2 rounded-full hover:bg-brutal-lime hover:text-black transition-colors duration-300"
      >
        {lang === "EN" ? "BN" : "EN"}
      </button>
    </div>
  )
}
