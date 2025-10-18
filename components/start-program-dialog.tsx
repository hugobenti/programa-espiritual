"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SundayPicker } from "@/components/sunday-picker"
import { useProgress } from "@/hooks/use-progress"
import ProgramInstructions from "./program-instructions"

export function StartProgramDialog() {
  const [open, setOpen] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [pendingStartDate, setPendingStartDate] = useState<Date | null>(null)
  const [error, setError] = useState<string>("")

  const { start, isSunday, daysUntilSunday } = useProgress()

  // chamado quando usuário escolhe domingo ou clica “começar hoje”
  const handleSelectDate = (date?: Date) => {
    setError("")
    setPendingStartDate(date ?? new Date())
    setOpen(false)
    setShowInstructions(true)
  }

  // quando o usuário clica em “Continuar” após ler instruções
  const handleConfirmStart = () => {
    try {
      if (pendingStartDate) {
        start(pendingStartDate)
      } else {
        start()
      }
      window.location.reload()
    } catch {
      setError("Erro ao iniciar o programa.")
    }
  }

  // === STEP 2: Leitura das instruções ===
  if (showInstructions) {
    return (
      <div className="min-h-[100vh_-_64px] w-full bg-white py-10 px-6 flex flex-col items-center">
        <div className="max-w-3xl w-full">
          <ProgramInstructions />

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="px-10 py-5 text-lg"
              onClick={handleConfirmStart}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // === STEP 1: Seleção de domingo ===
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg px-8 py-6">
          {isSunday ? "Começar Hoje" : `Começar (${daysUntilSunday} dias até domingo)`}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Definir Domingo Inicial</DialogTitle>
          <DialogDescription>
            O programa deve começar em um domingo.
            {!isSunday && (
              <> Faltam <strong>{daysUntilSunday} dias</strong> para o próximo domingo.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {isSunday && (
            <Button
              onClick={() => handleSelectDate(new Date())}
              className="w-full"
              size="lg"
            >
              Começar Hoje
            </Button>
          )}

          <SundayPicker onSelect={(date) => handleSelectDate(date)} />

          {error && (
            <div className="w-full rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
