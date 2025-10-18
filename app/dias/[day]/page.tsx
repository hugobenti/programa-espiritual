"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Reflection } from "@/lib/types";
import { ReflectionCard } from "@/components/reflection-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DayPage() {
  const params = useParams();
  const router = useRouter();
  const day = Number.parseInt(params.day as string);
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(day) || day < 1 || day > 63) {
      router.push("/dias");
      return;
    }

    fetch(`/api/reflections/${day}`)
      .then((res) => res.json())
      .then((data) => {
        setReflection(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reflection:", err);
        setLoading(false);
      });
  }, [day, router]);

  if (loading) {
    return (
      <div className="min-h-[100vh_-_64px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!reflection) {
    return (
      <div className="min-h-[100vh_-_64px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Reflexão não encontrada</p>
          <Button asChild>
            <Link href="/dias">Voltar</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh_-_64px]">

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <ReflectionCard reflection={reflection} />

        <div className="flex items-center justify-between mt-12 pt-8 border-t">
          {day > 1 ? (
            <Link href={`/dias/${day - 1}`} className="cursor-pointer">
              {" "}
              <Button asChild variant="outline">
                Dia Anterior
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {day < 63 ? (
            <Link href={`/dias/${day + 1}`} className="cursor-pointer">
              <Button asChild variant="outline">
                Próximo Dia
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
