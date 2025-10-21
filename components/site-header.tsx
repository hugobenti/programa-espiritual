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
            aria-hidden="true"
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
            aria-hidden="true"
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

      {/* === ORAÇÕES + SVG MÃOS REZANDO === */}
      <Button asChild variant="ghost" size="sm" onClick={onClick}>
        <Link
          href="/oracoes"
          className="inline-flex items-center text-sm text-gray-800"
        >
          <svg
            fill="currentColor"
            className="h-4 w-4 mr-2"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M 15 3 C 13.355469 3 12 4.355469 12 6 L 12.015625 5.835938 L 11.03125 11.746094 L 9.140625 16.917969 C 9.105469 16.964844 9.0625 17 9 17 L 8 17 L 8 16 L 3 16 L 3 29 L 8 29 L 8 26 L 11.925781 26 C 13.570313 26 15.050781 25.203125 16 23.964844 C 16.949219 25.203125 18.429688 26 20.074219 26 L 24 26 L 24 29 L 29 29 L 29 16 L 24 16 L 24 17 L 23 17 C 22.9375 17 22.894531 16.964844 22.859375 16.917969 L 20.96875 11.746094 L 19.984375 5.835938 L 20 6 C 20 4.355469 18.644531 3 17 3 C 16.660156 3 16.3125 3.066406 16 3.226563 C 15.6875 3.066406 15.339844 3 15 3 Z M 14.964844 5.015625 C 14.984375 5.160156 15 5.488281 15 6 L 15 21.4375 C 14.722656 22.921875 13.445313 24 11.925781 24 L 8 24 L 8 19 L 9 19 C 9.785156 19 10.515625 18.574219 10.902344 17.890625 L 10.941406 17.816406 L 12.96875 12.253906 L 14 6.082031 L 14 6 C 14 5.449219 14.421875 5.035156 14.964844 5.015625 Z M 17.035156 5.015625 C 17.578125 5.035156 18 5.449219 18 6 L 18 6.082031 L 19.03125 12.253906 L 21.058594 17.816406 L 21.097656 17.890625 C 21.484375 18.574219 22.214844 19 23 19 L 24 19 L 24 24 L 20.074219 24 C 18.554688 24 17.277344 22.921875 17 21.4375 L 17 6 C 17 5.488281 17.015625 5.160156 17.035156 5.015625 Z M 5 18 L 6 18 L 6 27 L 5 27 Z M 26 18 L 27 18 L 27 27 L 26 27 Z"></path>
            </g>
          </svg>
          Orações
        </Link>
      </Button>

      {/* === FAVORITOS === */}
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
            aria-hidden="true"
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

      {/* === TODOS OS DIAS === */}
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
            aria-hidden="true"
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
