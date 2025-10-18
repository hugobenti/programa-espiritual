"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProgress } from "@/hooks/use-progress";
import { SundayPicker } from "./sunday-picker";

export function DaySelector() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { setStartDate, start, progress } = useProgress();

  const handleSelectDate = (date: Date) => {
    try {
      setError("");
      if (progress) {
        setStartDate(date);
      } else {
        start(date);
      }
      setOpen(false);
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao definir a data de início."
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="sr-only">Configurações</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Definir Domingo Inicial</DialogTitle>
          <DialogDescription>
            {progress ? (
              <>
                Você está atualmente no{" "}
                <strong>dia {progress?.currentDay}</strong> do programa.
                {progress?.startDate && (
                  <>
                    {" "}
                    Sua data de início é{" "}
                    <strong>{formatDate(progress.startDate)}</strong>.
                  </>
                )}
              </>
            ) : (
              <>Você ainda não começou o programa.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <SundayPicker onSelect={handleSelectDate} />

          {error && (
            <div className="w-full rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
