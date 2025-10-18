import { NextResponse } from "next/server"
import rawReflections from "@/data/reflections.json"

export async function GET(request: Request, { params }: { params: { day: string } }) {
  try {
    const day = Number.parseInt(params.day)

    if (isNaN(day) || day < 1 || day > 63) {
      return NextResponse.json({ error: "Invalid day number. Must be between 1 and 63." }, { status: 400 })
    }

    const lines = (rawReflections as Record<string, string[]>)[String(day)]
    if (!lines) {
      return NextResponse.json({ error: "Reflection not found" }, { status: 404 })
    }

    const title = lines[0] ?? `Dia ${day}`
    const quote = lines[1] ?? ""
    const body = lines.slice(2).join("\n\n")
    return NextResponse.json({
      day,
      week: Math.ceil(day / 7),
      title,
      quote,
      reflection: body,
      practice: "",
      affirmation: "",
      lines,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reflection" }, { status: 500 })
  }
}
