import { NextResponse } from "next/server"
import rawReflections from "@/data/reflections.json"

export async function GET() {
  try {
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
      .sort((a, b) => a.day - b.day)

    return NextResponse.json({ reflections })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reflections" }, { status: 500 })
  }
}
