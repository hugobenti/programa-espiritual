"use client"

import { useState } from "react"

interface SundayPickerProps {
  onSelect: (date: Date) => void
  maxDate?: Date
}

export function SundayPicker({ onSelect, maxDate = new Date() }: SundayPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const isSunday = (day: number) => {
    const date = new Date(year, month, day)
    return date.getDay() === 0
  }

  const isDisabled = (day: number) => {
    const date = new Date(year, month, day)
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const normalizedMax = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
    return !isSunday(day) || normalizedDate.getTime() > normalizedMax.getTime()
  }

  const handleDayClick = (day: number) => {
    if (!isDisabled(day)) {
      const selectedDate = new Date(year, month, day)
      onSelect(selectedDate)
    }
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const disabled = isDisabled(day)
    const sunday = isSunday(day)

    days.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        disabled={disabled}
        className={`
          aspect-square rounded-lg text-sm font-medium transition-all
          ${
            sunday && !disabled
              ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              : disabled
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground cursor-not-allowed"
          }
        `}
      >
        {day}
      </button>,
    )
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="rounded-lg p-2 hover:bg-accent transition-colors"
          aria-label="Mês anterior"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h3>

        <button
          onClick={nextMonth}
          className="rounded-lg p-2 hover:bg-accent transition-colors"
          aria-label="Próximo mês"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((name) => (
          <div key={name} className="text-center text-xs font-medium text-muted-foreground py-2">
            {name}
          </div>
        ))}
        {days}
      </div>

      <p className="text-xs text-center text-muted-foreground">Apenas domingos podem ser selecionados</p>
    </div>
  )
}
