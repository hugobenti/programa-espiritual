"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { StartProgramDialog } from "@/components/start-program-dialog";
import { ReflectionCard } from "@/components/reflection-card";
import { DaySelector } from "@/components/day-selector";
import type { Reflection } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProgramCompleted } from "@/components/program-completed";
import ProgramInstructions from "@/components/program-instructions";

export default function Home() {
  const { progress, isLoading, hasStarted, restart } = useProgress();
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [loadingReflection, setLoadingReflection] = useState(false);

  useEffect(() => {
    if (progress?.currentDay) {
      setLoadingReflection(true);
      fetch(`/api/reflections/${progress.currentDay}`)
        .then((res) => res.json())
        .then((data) => {
          setReflection(data);
          setLoadingReflection(false);
        })
        .catch((err) => {
          console.error("Error fetching reflection:", err);
          setLoadingReflection(false);
        });
    }
  }, [progress?.currentDay]);

  if (isLoading) {
    return (
      <div className="min-h-[100vh_-_64px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground pt-32">Carregando...</div>
      </div>
    );
  }

  if (hasStarted && progress && progress.currentDay > 63) {
    return <ProgramCompleted onRestart={restart} />;
  }

  if (!hasStarted) {
    return (
      <div className="min-h-[100vh_-_64px] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-6xl font-medium text-balance">
              Programa Espiritual
            </h1>
            <p className="text-xl text-muted-foreground text-balance mt-6">
              Você vai conhecer agora o PROGRAMA ESPIRITUAL. É um poderoso
              programa de orações que já beneficiou inúmeras pessoas com as
              graças que obtiveram. Recebeu este nome porque contém 63
              afirmativas que deverão ser feitas diariamente, durante 9 semanas
              seguidas. Estas afirmativas podem transformar qualquer situação
              aflitiva em vitória pessoal para você. Peritos espirituais afirmam
              que falando com fé estas afirmativas, ao final deste programa,
              você terá alcançado a graça que almeja.{" "}
            </p>
          </div>

          <StartProgramDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh_-_64px]">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {loadingReflection ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted-foreground">
              Carregando reflexão...
            </div>
          </div>
        ) : reflection ? (
          <ReflectionCard reflection={reflection} />
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            Reflexão não encontrada
          </div>
        )}
      </main>
    </div>
  );
}
