export interface Reflection {
  day: number
  week: number
  title: string
  quote: string
  reflection: string
  practice: string
  affirmation: string
  lines?: string[]
}

export interface ProgramData {
  program: {
    title: string
    description: string
    totalWeeks: number
    totalDays: number
  }
  reflections: Reflection[]
}

export interface UserProgress {
  startDate: string // ISO date string
  currentDay: number
  lastAccessDate: string // ISO date string
  favorites: number[] // Array of day numbers that are favorited
}
