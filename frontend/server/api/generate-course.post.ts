import OpenAI from 'openai';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { courseId, courseTitle } = body

  if (!courseId || !courseTitle) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing course data"
    })
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const prompt = `
Generate an e-learning course for "${courseTitle}".
Return 5 lessons.
Each lesson should have:
- title
- detailed markdown content
Do NOT include explanations outside JSON.
`

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  })

  let lessons

  try {
    lessons = JSON.parse(response.choices[0].message.content!)
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "AI returned invalid format"
    })
  }

  const supabase = await serverSupabaseClient(event)

  const inserts = lessons.map((lesson: any, index: number) => ({
    course_id: courseId,
    page_index: index + 1,
    title: lesson.title,
    content_md: lesson.content
  }))

  const { error } = await supabase
    .from("course_pages")
    .insert(inserts)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return { success: true }
})

function readBody(event: any) {
    // return the parsed body if present on the event (frameworks often attach it)
    return (event as any).body ?? {};
}

