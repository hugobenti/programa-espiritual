"use client"

import { useEffect, useState } from "react"
import { useProgress } from "@/hooks/use-progress"
import type { Reflection } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function AllDaysPage() {
  const { progress } = useProgress()
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState("1")

  useEffect(() => {
    fetch("/api/reflections")
      .then((res) => res.json())
      .then((data) => {
        setReflections(data.reflections)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching reflections:", err)
        setLoading(false)
      })
  }, [])

  const getReflectionsByWeek = (week: number) => {
    return reflections.filter((r) => r.week === week)
  }

  if (loading) {
    return (
      <div className="min-h-[100vh_-_64px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-[100vh_-_64px]">

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl font-medium">Navegue pelas 9 Semanas</h1>
            <p className="text-muted-foreground">
              Explore todas as reflexões do programa. {progress  &&  progress.currentDay < 64 ? `Você está no dia ${progress.currentDay}.` : `Você já concluiu o programa.`}
            </p>
          </div>

          <Tabs value={selectedWeek} onValueChange={setSelectedWeek} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-9 h-auto gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
                <TabsTrigger key={week} value={week.toString()} className="text-sm">
                  Semana {week}
                </TabsTrigger>
              ))}
            </TabsList>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
              <TabsContent key={week} value={week.toString()} className="space-y-4 mt-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
  {getReflectionsByWeek(week).map((reflection) => (
    <Link key={reflection.day} href={`/dias/${reflection.day}`} className="block h-full">
      <Card
        className={`h-full flex flex-col transition-all hover:shadow-md cursor-pointer ${
          progress?.currentDay === reflection.day ? "ring-2 ring-primary" : ""
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Dia {reflection.day}</span>
            {progress?.currentDay === reflection.day && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                Atual
              </span>
            )}
          </div>
          <CardTitle className="font-serif text-xl">{reflection.title}</CardTitle>
        </CardHeader>

        {/* Área elástica para ocupar o espaço disponível */}
        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground line-clamp-2 italic">
            {reflection.quote}
          </p>

          {/* Mantém o “Ler reflexão” colado ao rodapé do card */}
          <div className="flex items-center justify-end mt-auto text-sm text-primary">
            Ler reflexão
            <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>

              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
