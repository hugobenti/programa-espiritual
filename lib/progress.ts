import type { UserProgress } from "./types"

const STORAGE_KEY = "spiritual-program-progress"

export function isSunday(date: Date = new Date()): boolean {
  return date.getDay() === 0
}

function getPreviousSunday(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  const dayOfWeek = result.getDay()

  if (dayOfWeek === 0) {
    // Already Sunday
    return result
  }

  // Go back to previous Sunday
  result.setDate(result.getDate() - dayOfWeek)
  return result
}

export function calculateCurrentDay(startDate: string): number {
  const start = new Date(startDate)
  const today = new Date()

  // Reset time to midnight for accurate day calculation
  start.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // Day 1 is the start date, so we add 1
  const currentDay = diffDays + 1

  return Math.max(currentDay, 1)
}

export function getProgress(): UserProgress | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const progress: UserProgress = JSON.parse(stored)

    if (!progress.favorites) {
      progress.favorites = []
    }

    // Update current day based on start date
    progress.currentDay = calculateCurrentDay(progress.startDate)
    progress.lastAccessDate = new Date().toISOString()

    // Save updated progress
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))

    return progress
  } catch (error) {
    console.error("Error reading progress:", error)
    return null
  }
}

export function startProgram(startDate?: Date): UserProgress {
  const date = startDate || new Date()

  // If no custom date provided, ensure it's a Sunday
  if (!startDate && !isSunday(date)) {
    throw new Error("Program must start on a Sunday")
  }

  const progress: UserProgress = {
    startDate: date.toISOString(),
    currentDay: 1,
    lastAccessDate: new Date().toISOString(),
    favorites: [],
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}

export function setManualDay(day: number): UserProgress | null {
  if (day < 1 || day > 63) {
    throw new Error("Day must be between 1 and 63")
  }

  const progress = getProgress()
  if (!progress) {
    throw new Error("No program started. Please start the program first.")
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate what date would be "day 1" if today is the selected day
  const daysToSubtract = day - 1
  const calculatedDay1 = new Date(today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000)

  // Adjust to the previous Sunday to ensure start date is always Sunday
  const newStartDate = getPreviousSunday(calculatedDay1)

  progress.startDate = newStartDate.toISOString()
  progress.currentDay = calculateCurrentDay(newStartDate.toISOString())
  progress.lastAccessDate = new Date().toISOString()

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}

export function toggleFavorite(day: number): UserProgress | null {
  if (day < 1 || day > 63) {
    throw new Error("Day must be between 1 and 63")
  }

  const progress = getProgress()
  if (!progress) {
    throw new Error("No program started. Please start the program first.")
  }

  if (!progress.favorites) {
    progress.favorites = []
  }

  const index = progress.favorites.indexOf(day)
  if (index > -1) {
    // Remove from favorites
    progress.favorites.splice(index, 1)
  } else {
    // Add to favorites
    progress.favorites.push(day)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}

export function isFavorite(day: number): boolean {
  const progress = getProgress()
  if (!progress || !progress.favorites) return false
  return progress.favorites.includes(day)
}

export function getFavorites(): number[] {
  const progress = getProgress()
  if (!progress || !progress.favorites) return []
  return progress.favorites.sort((a, b) => a - b)
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function restartProgram(): UserProgress {
  const today = new Date()
  const nextSunday = getNextSunday(today)

  const progress: UserProgress = {
    startDate: nextSunday.toISOString(),
    currentDay: 1,
    lastAccessDate: new Date().toISOString(),
    favorites: [],
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}

function getNextSunday(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  const dayOfWeek = result.getDay()

  if (dayOfWeek === 0) {
    // Today is Sunday, return next Sunday
    result.setDate(result.getDate() + 7)
    return result
  }

  // Go forward to next Sunday
  result.setDate(result.getDate() + (7 - dayOfWeek))
  return result
}

export function hasStarted(): boolean {
  return getProgress() !== null
}

export function getDaysUntilSunday(): number {
  const today = new Date()
  const dayOfWeek = today.getDay()

  if (dayOfWeek === 0) return 0 // Today is Sunday

  return 7 - dayOfWeek // Days until next Sunday
}

export function setStartDate(startDate: Date): UserProgress | null {
  if (!isSunday(startDate)) {
    throw new Error("A data de início deve ser um domingo")
  }

  const progress = getProgress()
  if (!progress) {
    throw new Error("Nenhum programa iniciado. Por favor, inicie o programa primeiro.")
  }

  startDate.setHours(0, 0, 0, 0)

  progress.startDate = startDate.toISOString()
  progress.currentDay = calculateCurrentDay(startDate.toISOString())
  progress.lastAccessDate = new Date().toISOString()

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}
