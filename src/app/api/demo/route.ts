import { NextResponse } from 'next/server';

export async function GET() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clan Roar Tweet</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex justify-center items-center min-h-screen bg-black">
  <div class="bg-[#15202B] p-6 rounded-2xl shadow-lg max-w-xl text-white relative">
    <div class="mb-6">
      <p class="text-lg font-normal leading-relaxed">
        I don’t tweet anymore.<br><br>
        I Roar - with Clan McHODLer ⚔️ behind me.<br><br>
        Privacy is power. Roar wisely.<br><br>
        <span>Choose your Clan & join the waitlist 👉</span><br>
        <a href="https://clans.kilt.io/referral/1456xxxx" target="_blank" class="text-blue-400 hover:underline">
          clans.kilt.io/referral/1456xxxx
        </a>
      </p>
    </div>

    <div class="mb-6">
      <img 
        src="https://yourdomain.com/path/to/image.png" 
        alt="Clan McHODLer" 
        class="w-full rounded-xl border border-purple-600 shadow-purple-500/50 shadow-md"
      />
    </div>

    <div class="flex justify-center">
      <a href="https://twitter.com/intent/tweet?text=I%20don’t%20tweet%20anymore.%0A%0AI%20Roar%20-%20with%20Clan%20McHODLer%20⚔️%20behind%20me.%0A%0APrivacy%20is%20power.%20Roar%20wisely.%0A%0AChoose%20your%20Clan%20%26%20join%20the%20waitlist%20👉%20clans.kilt.io/referral/1456xxxx"
         target="_blank"
         class="bg-[#1DA1F2] text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition">
        Roar on Twitter
      </a>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
