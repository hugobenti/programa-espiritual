"use client"

import { useState, useEffect } from "react"
import type { UserProgress } from "@/lib/types"
import {
  getProgress,
  startProgram,
  setManualDay,
  setStartDate,
  resetProgress,
  restartProgram,
  hasStarted,
  isSunday,
  getDaysUntilSunday,
  toggleFavorite,
  isFavorite,
  getFavorites,
} from "@/lib/progress"

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load progress on mount
    const loadProgress = () => {
      const stored = getProgress()
      setProgress(stored)
      setIsLoading(false)
    }

    loadProgress()
  }, [])

  const start = (customDate?: Date) => {
    try {
      const newProgress = startProgram(customDate)
      setProgress(newProgress)
      return newProgress
    } catch (error) {
      throw error
    }
  }

  const setDay = (day: number) => {
    try {
      const updatedProgress = setManualDay(day)
      setProgress(updatedProgress)
      return updatedProgress
    } catch (error) {
      throw error
    }
  }

  const setStart = (startDate: Date) => {
    try {
      const updatedProgress = setStartDate(startDate)
      setProgress(updatedProgress)
      return updatedProgress
    } catch (error) {
      throw error
    }
  }

  const reset = () => {
    resetProgress()
    setProgress(null)
  }

  const restart = () => {
    try {
      const newProgress = restartProgram()
      setProgress(newProgress)
      return newProgress
    } catch (error) {
      throw error
    }
  }

  const toggleFav = (day: number) => {
    try {
      const updatedProgress = toggleFavorite(day)
      setProgress(updatedProgress)
      return updatedProgress
    } catch (error) {
      throw error
    }
  }

  return {
    progress,
    isLoading,
    hasStarted: hasStarted(),
    isSunday: isSunday(),
    daysUntilSunday: getDaysUntilSunday(),
    start,
    setDay,
    setStartDate: setStart,
    reset,
    restart,
    toggleFavorite: toggleFav,
    isFavorite,
    getFavorites,
  }
}
