"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DaySelector } from "@/components/day-selector";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // trava scroll quando o menu abre
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      const prev = html.style.overflow;
      html.style.overflow = "hidden";
      return () => {
        html.style.overflow = prev;
      };
    }
  }, [open]);

  // fecha com Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // clicar fora fecha
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <nav className="flex flex-col gap-3 items-start pl-[20vw] md:pl-0 md:flex-row md:items-center md:gap-2">
    {/* === INÍCIO + SVG CASA === */}
    <Button asChild variant="ghost" size="sm" onClick={onClick}>
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-800"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9.75l9-7.5 9 7.5V19.5a1.5 1.5 0 01-1.5 1.5H13.5v-6h-3v6H4.5A1.5 1.5 0 013 19.5V9.75z"
          />
        </svg>
        Início
      </Link>
    </Button>

    {/* === INSTRUÇÕES + SVG INFO === */}
    <Button asChild variant="ghost" size="sm" onClick={onClick}>
      <Link
        href="/instrucoes"
        className="inline-flex items-center text-sm text-gray-800"
      >
  <svg
      className="h-4 w-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 3h8l4 4v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 8h5M9 12h6M9 16h6"
      />
    </svg>
        Instruções
      </Link>
    </Button>

    {/* === SVG FAVORITOS (igual ao seu) === */}
    <Button asChild variant="ghost" size="sm" onClick={onClick}>
      <Link
        href="/favoritos"
        className="inline-flex items-center text-sm text-gray-800"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Favoritos
      </Link>
    </Button>

    {/* === SVG TODOS OS DIAS (igual ao seu) === */}
    <Button asChild variant="ghost" size="sm" onClick={onClick}>
      <Link
        href="/dias"
        className="inline-flex items-center text-sm text-gray-800"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        Todos os Dias
      </Link>
    </Button>

    <div className="flex justify-center">
      <DaySelector />
    </div>
  </nav>
);


  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="shrink-0">
          <h1 className="font-serif text-lg font-medium md:text-xl">
            Programa Espiritual
          </h1>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLinks />
        </div>

        {/* mobile: botão */}
        <div className="md:hidden">
          <button
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* mobile: overlay + drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 z-[90] bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={panelRef}
          className={`fixed right-0 top-0 z-[100] flex w-screen flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex h-16 items-center justify-between border-b border-neutral-300 px-4 bg-gray-200 ">
            <span className="font-serif text-base">Programa Espiritual</span>
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-4 bg-gray-100 ">
            <NavLinks onClick={() => setOpen(false)} />
          </div>

          <div className="bg-gradient-to-b from-gray-100 to-transparent h-16" />
        </div>
      </div>
    </header>
  );
}
