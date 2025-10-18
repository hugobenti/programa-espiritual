"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"

interface ProgramCompletedProps {
  onRestart: () => void
}

export function ProgramCompleted({ onRestart }: ProgramCompletedProps) {
  const { reset } = useProgress()
  const handleRestart = () => {
    reset();
    window.location.reload();
  }
  return (
    <div className="min-h-[100vh_-_64px] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full p-8 md:p-12 space-y-8">

        <div className="mx-auto max-w-2xl space-y-4 text-pretty">
          <p className="text-lg leading-relaxed">
            Você acaba de cumprir um poderoso PROGRAMA ESPIRITUAL. Recebeu de DEUS, por intermédio DELE, a graça que pediu e muitas outras que não pediu.
          </p>
          <p className="text-lg leading-relaxed">
            Percebeu e constatou que as afirmativas aqui registradas são cheias de PODER.
          </p>
          <p className="text-lg leading-relaxed">
            Acredite que a FORÇA criadora do
            UNIVERSO continua criando inúmeras coisas e criou também as possibilidades para que seus pedidos se materializem.
          </p>
          <p className="text-lg leading-relaxed">
            Você sabe agora que as afirmativas em orações libertam as forças, por intermédio das quais se seguem os resultados. Não abandone este hábito.
          </p>
          <p className="text-lg leading-relaxed">
            Recomece: você ainda tem muito o que receber de DEUS para sua vida. Reinicie o programa, pedindo novas bênçãos.
          </p>
          <p className="text-lg leading-relaxed italic text-center">
            Obrigado, meu Pai, por tantas graças recebidas.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Button size="lg" onClick={handleRestart} className="text-base">
            Recomeçar Jornada
          </Button>
        </div>
      </div>
    </div>
  )
}
