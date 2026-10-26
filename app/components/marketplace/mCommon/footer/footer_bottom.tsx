"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Globe, Heart } from "lucide-react";

const languages = ["English", "Español", "Français", "Deutsch", "සිංහල", "தமிழ்"];

export default function FooterBottom() {
  // Language menu state stays local to the component that uses it.
  const [lang, setLang] = useState("English");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langOpen]);

  return (
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-200 pt-6 text-center text-sm md:flex-row md:justify-between md:text-left">
            <p className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start font-semibold text-slate-900">
              © 2026 Bits Shop. Built with
              <Heart
                className="bs-anim h-4 w-4 fill-rose-500 text-rose-500"
                style={{ animation: "bs-beat 1.6s ease-in-out infinite" }}
              />
              for growing businesses.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-medium text-slate-500">
              {["Privacy Policy", "Terms of Service"].map((t) => (
                <a key={t} href="#" className="group/t relative transition-colors hover:text-slate-900">
                  {t}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-center scale-x-0 bg-slate-900 transition-transform duration-300 group-hover/t:scale-x-100" />
                </a>
              ))}

              {/* Language picker */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setLangOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-amber-50 hover:text-slate-900"
                >
                  <Globe className="h-4 w-4" />
                  {lang}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul
                  role="listbox"
                  className={`absolute bottom-full right-1/2 z-20 mb-2 w-40 translate-x-1/2 origin-bottom overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl transition-all duration-200 md:right-0 md:translate-x-0 ${
                    langOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }`}
                >
                  {languages.map((l) => (
                    <li key={l}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={l === lang}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-slate-700 hover:bg-amber-50"
                      >
                        {l}
                        {l === lang && <Check className="h-4 w-4 text-amber-600" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
  );
}
