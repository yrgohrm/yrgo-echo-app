import { escapeHtml } from "./escape-html.mts"

import type { Config, Context } from "@netlify/functions"

export const config: Config = {
  path: "/echo"
}

export default async (req: Request, context: Context) => {
  const spList: string[] = []

  const url = new URL(req.url)
  for (const [key, value] of url.searchParams) {
    spList.push(escapeHtml(key) + "=" + escapeHtml(value))
  }

  const spOutput = spList.join("<br>")

  const webpage = `
  <html>
  <head>
    <meta charset="UTF-8">
    <title>echo</title>
  </head>
  <body>
    <h1>Echo Information</h1>
    <div>
      <h2>Method</h2>
      ${req.method}
    </div>
    <div>
      <h2>Query Parameters</h2>
      ${spOutput}
    </div>
    <div>
      <h2>Body</h2>
      ${escapeHtml(await req.text())}
    </div>
  </body>
  </html>
  `

  return new Response(webpage, { headers: { "Content-type": "text/html" } })
}
