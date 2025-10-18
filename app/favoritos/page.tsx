"use client"

import { useEffect, useState } from "react"
import { useProgress } from "@/hooks/use-progress"
import type { Reflection } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FavoritosPage() {
  const { getFavorites, isFavorite } = useProgress()
  const [favorites, setFavorites] = useState<Reflection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      const favoriteDays = getFavorites()

      if (favoriteDays.length === 0) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/reflections")
        const data = await response.json()

        const favoriteReflections = data.reflections.filter((r: Reflection) => favoriteDays.includes(r.day))

        setFavorites(favoriteReflections)
      } catch (error) {
        console.error("Error loading favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [getFavorites])

  if (isLoading) {
    return (
      <div className="min-h-[100vh_-_64px] bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando favoritos...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[100vh_-_64px] bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Favoritos</h1>
            <p className="text-lg text-muted-foreground">
              {favorites.length === 0
                ? "Você ainda não tem reflexões favoritas."
                : `${favorites.length} ${favorites.length === 1 ? "reflexão favorita" : "reflexões favoritas"}`}
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Fechar</span>
            </Button>
          </Link>
        </div>

        {favorites.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                className="h-16 w-16 text-muted-foreground mb-4"
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
              <h3 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Comece a favoritar reflexões que ressoam com você clicando no ícone de coração.
              </p>
              <Link href="/dias">
                <Button>Explorar Reflexões</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {favorites.map((reflection) => (
              <Link key={reflection.day} href={`/dias/${reflection.day}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardDescription className="text-sm font-medium uppercase tracking-wider">
                      Dia {reflection.day} • Semana {reflection.week}
                    </CardDescription>
                    <CardTitle className="text-2xl font-serif text-balance">{reflection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{reflection.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
