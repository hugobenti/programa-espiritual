"use client"

import type { Reflection } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"
import { useState, useEffect, useMemo } from "react"

interface ReflectionCardProps {
  reflection: Reflection
  showDayInfo?: boolean
}

type Block =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; citation?: string }
  | { type: "attribution"; text: string } // Ex.: (São Paulo)
  | { type: "intro"; citation: string } // fallback (raro)
  | { type: "loose-citation"; citation: string } // fallback (raro)

const CITE_LINE_REGEX =
  /^(\d?\s*)?(Mt|Mc|Mr|Jo|Rm|Sl|SL|Apoc|APOC|Tia|Cron|Cron\.)(\s+)?\d+\s*[,.:]\s*\d+(\s*-\s*\d+)?\.?$/i

const CITE_INLINE_REGEX =
  /(.*?)(?:\s*[—–-]\s*|\s+)?((?:\d?\s*)?(?:Mt|Mc|Mr|Jo|Rm|Sl|SL|Apoc|APOC|Tia|Cron|Cron\.)\s*\d+\s*[,.:]\s*\d+(?:\s*-\s*\d+)?\.?)\s*$/i

const isQuoted = (s: string) => {
  const t = s.trim()
  // Aspas tipográficas “ ” ou aspas normais
  const starts = t.startsWith("“") || t.startsWith('"')
  const ends = t.endsWith("”") || t.endsWith('"')
  return starts && ends && t.length > 1
}

const isAttribution = (s: string) => /^\(.+\)$/.test(s.trim())

function parseLines(lines: string[]): Block[] {
  const blocks: Block[] = []
  let lastIndexWithQuote: number | null = null

  for (const raw of lines ?? []) {
    const line = raw?.trim()
    if (!line) continue


    if(line[0] === '*') {
      // linha de introdução (raro)
      blocks.push({ type: "intro", citation: line.substring(1).trim() })
      lastIndexWithQuote = null
      continue
    }

    // 1) Atribuição entre parênteses (ex.: (São Paulo))
    if (isAttribution(line)) {
      blocks.push({ type: "attribution", text: line.replace(/^\(|\)$/g, "").trim() })
      lastIndexWithQuote = null
      continue
    }

    // 2) Linha que é apenas citação (ex.: "Mt 7,7-8")
    if (CITE_LINE_REGEX.test(line)) {
      if (lastIndexWithQuote != null && blocks[lastIndexWithQuote]?.type === "quote") {
        const q = blocks[lastIndexWithQuote] as Extract<Block, { type: "quote" }>
        // só anexa se ainda não havia citação
        if (!q.citation) {
          q.citation = line.toUpperCase()
        } else {
          // se já tinha, empurra como solta (caso extremo)
          blocks.push({ type: "loose-citation", citation: line.toUpperCase() })
        }
      } else {
        // não veio logo após citação: mantém como solta
        blocks.push({ type: "loose-citation", citation: line.toUpperCase() })
      }
      lastIndexWithQuote = null
      continue
    }

    // 3) Frase com citação embutida no final (ex.: “... ” Jo 16,24)
    const inlineMatch = line.match(CITE_INLINE_REGEX)
    if (inlineMatch) {
      const text = inlineMatch[1]?.trim()
      const citation = inlineMatch[2]?.toUpperCase().trim()
      if (isQuoted(text)) {
        blocks.push({ type: "quote", text, citation })
        lastIndexWithQuote = blocks.length - 1
      } else {
        // Parágrafo normal com citação embutida
        blocks.push({ type: "paragraph", text })
        blocks.push({ type: "loose-citation", citation })
        lastIndexWithQuote = null
      }
      continue
    }

    // 4) Frase apenas (quote ou parágrafo)
    if (isQuoted(line)) {
      blocks.push({ type: "quote", text: line })
      lastIndexWithQuote = blocks.length - 1
    } else {
      blocks.push({ type: "paragraph", text: line })
      lastIndexWithQuote = null
    }
  }

  return blocks
}

export function ReflectionCard({ reflection, showDayInfo = true }: ReflectionCardProps) {
  const { toggleFavorite, isFavorite } = useProgress()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(isFavorite(reflection.day))
  }, [reflection.day, isFavorite])

  const handleToggleFavorite = () => {
    toggleFavorite(reflection.day)
    setIsFav((v) => !v)
  }

  const blocks = useMemo(() => parseLines(reflection.lines ?? []), [reflection.lines])

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
              aria-pressed={isFav}
              aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <svg
                className={`h-5 w-5 transition-colors ${isFav ? "fill-red-500 stroke-red-500" : "stroke-current"}`}
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
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

      <CardContent className="space-y-6">
        {blocks.map((b, idx) => {

        if (b.type === "intro") {
            return (
              <figure key={idx} className="space-y-2">
                {b.citation && (
                  <figcaption className="text-lg font-bold text-center leading-relaxed text-pretty">
                    {b.citation}
                  </figcaption>
                )}
              </figure>
            )
          }


          if (b.type === "quote") {
            return (
              <figure key={idx} className="space-y-2">
                <blockquote className="text-lg italic text-center leading-relaxed text-pretty">
                  {b.text}
                </blockquote>
                {b.citation && (
                  <figcaption className="text-sm italic text-muted-foreground text-right">
                    {b.citation}
                  </figcaption>
                )}
              </figure>
            )
          }

          if (b.type === "paragraph") {
            return (
              <p key={idx} className="leading-relaxed text-pretty text-lg indent-6">
                {b.text}
              </p>
            )
          }

          if (b.type === "attribution") {
            return (
              <p key={idx} className="text-sm italic text-muted-foreground text-right">
                {b.text}
              </p>
            )
          }

          // loose-citation (casos raros que não puderam ser anexados)
          return (
            <p key={idx} className="text-sm italic text-muted-foreground text-right">
              {b.citation}
            </p>
          )
        })}
      </CardContent>
    </Card>
  )
}
