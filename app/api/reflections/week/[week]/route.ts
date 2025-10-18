import { NextResponse } from "next/server"
import rawReflections from "@/data/reflections.json"

export async function GET(request: Request, { params }: { params: { week: string } }) {
  try {
    const week = Number.parseInt(params.week)

    if (isNaN(week) || week < 1 || week > 9) {
      return NextResponse.json({ error: "Invalid week number. Must be between 1 and 9." }, { status: 400 })
    }

    const reflections = Object.entries(rawReflections as Record<string, string[]>)
      .map(([dayStr, lines]) => {
        const day = Number.parseInt(dayStr)
        const title = lines[0] ?? `Dia ${day}`
        const quote = lines[1] ?? ""
        const body = lines.slice(2).join("\n\n")
        return {
          day,
          week: Math.ceil(day / 7),
          title,
          quote,
          reflection: body,
          practice: "",
          affirmation: "",
          lines,
        }
      })
      .filter((r) => r.week === week)
      .sort((a, b) => a.day - b.day)

    return NextResponse.json({ week, reflections })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch week reflections" }, { status: 500 })
  }
}
