import { Head, Html, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black">
        <Main />
        <NextScript />
        {/* Cloudflare Web Analytics */}
                 <>
                        <script
                            defer
                            src="https://static.cloudflareinsights.com/beacon.min.js"
                            data-cf-beacon='{"token": "4f832cb0cb404b83826cdd976b4d1aae", "spa": true}'
                        />
                    </>
      </body>
    </Html>
  )
}
