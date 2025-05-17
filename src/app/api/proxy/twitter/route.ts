// src/app/api/proxy/twitter/route.ts

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const externalURL = 'http://128.199.16.207/api/auth/twitter';

    const response = await fetch(externalURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Pass any additional headers if needed
      },
    });

    const body = await response.text(); // use text() or json() depending on the content type

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'text/plain',
        // Optional: Allow frontend to cache, CORS, etc.
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Proxy failed', detail: error }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
