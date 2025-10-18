"use client"

import type { Reflection } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"
import { useState, useEffect } from "react"

interface ReflectionCardProps {
  reflection: Reflection
  showDayInfo?: boolean
}

export function ReflectionCard({ reflection, showDayInfo = true }: ReflectionCardProps) {
  const { toggleFavorite, isFavorite } = useProgress()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(isFavorite(reflection.day))
  }, [reflection.day, isFavorite])

  const handleToggleFavorite = () => {
    toggleFavorite(reflection.day)
    setIsFav(!isFav)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-2 pb-2">
        {showDayInfo && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Dia {reflection.day}</span>
              <span>Semana {reflection.week}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className="rounded-full hover:bg-accent"
              aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <svg
                className={`h-5 w-5 transition-colors ${isFav ? "fill-red-500 stroke-red-500" : "stroke-current"}`}
                fill={isFav ? "currentColor" : "none"}
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
            </Button>
          </div>
        )}

   
      </CardHeader>

      <CardContent className="space-y-8">
          <div>
            <div className="space-y-4">
              {reflection.lines && reflection.lines.slice(0).map((paragraph, idx) => {
                const trimmed = paragraph.trim()
                const isQuoted = trimmed.startsWith('"') && trimmed.endsWith('"')
                const isCitation = /^(Mt|MT|Mc|MC|Jo|JO|Rm|RM|Apoc|APOC|Tia|TIA)\s/.test(trimmed)
                const alignClass = isQuoted ? 'text-center' : isCitation ? 'text-left' : ''
                const baseClass = 'leading-relaxed text-pretty'
                const normalClass = !isQuoted && !isCitation ? 'text-lg indent-6' : ''
                const quotedClass = isQuoted ? 'text-lg italic' : ''
                const citationClass = isCitation ? 'text-sm italic text-muted-foreground' : ''
                return (
                  <p
                    key={idx}
                    className={`${baseClass} ${alignClass} ${normalClass} ${quotedClass} ${citationClass}`}
                  >
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        

       
      </CardContent>
    </Card>
  )
}
