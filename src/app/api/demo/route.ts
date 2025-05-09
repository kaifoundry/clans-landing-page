import { NextResponse } from 'next/server';

export async function GET() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   {/* Twitter Card meta tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Page Title" />
  <meta name="twitter:description" content="Your page description here" />
  <meta name="twitter:image" content="https://yourdomain.com/path-to-image.jpg" />
  <meta name="twitter:image:alt" content="Alternative text for image" />
  <title>Clan Roar Tweet</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex justify-center items-center min-h-screen bg-black p-6">

  <div class="rounded-xl opacity-70 backdrop-blur-2xl 2xl:w-[1300px] xl:h-[542px] xl:w-[1300px] md:w-[700px] h-[400px] w-[400px] relative"
       style="background-color: #6B21A8;"> <!-- Example: purple glow -->

    <div class="absolute inset-[20px] rounded-xl bg-[url('https://yourdomain.com/Images/cardPage/cardBg.png')] bg-cover bg-center">
      <div class="flex flex-col p-10 gap-y-10">

        <!-- User Info -->
        <div class="flex flex-row items-center">
          <img 
            src="https://yourdomain.com/Images/cardPage/avtar_1.png" 
            alt="userProfilePic" 
            class="rounded-full h-20 w-20 border-white border-2 object-cover"
          />

          <div class="flex flex-col py-4 px-2">
            <p class="font-semibold text-white">Yashika</p>
            <p class="text-sm text-gray-300">yashika@gmail.com</p>
          </div>
        </div>

        <!-- Roar Message -->
        <p class="text-white leading-relaxed">
          I don’t tweet anymore. I Roar - with Clan McHODLer ⚔️ behind me.<br><br>
          Privacy is power. Roar wisely.
        </p>

        <!-- Title and Description -->
        <div>
          <h1 class="text-purple-500 text-4xl font-semibold mb-2">
            Clan McHODLer
          </h1>
          <p class="text-lg text-white">
            Join the decentralized movement where your voice is your true power. Roar wisely, roar freely.
          </p>
        </div>

        <!-- Bottom Icons -->
        <div class="flex items-center mt-10 gap-4">
          <img 
            src="https://yourdomain.com/Images/gettingStarted/Object.png" 
            alt="Object1" 
            class="w-10 h-20 object-contain"
          />
          <img 
            src="https://yourdomain.com/Images/gettingStarted/Clans.png" 
            alt="Clans" 
            class="w-20 h-15 object-contain"
          />
        </div>
      </div>

      <!-- Large Side Image -->
      <img 
        src="https://yourdomain.com/Images/cardPage/cardMainImage.png" 
        alt="Main Card Image" 
        class="absolute bottom-0 right-0 h-[250px] w-[220px] xl:w-1/3 xl:h-[90%] object-contain"
      />
    </div>
  </div>

  <!-- Twitter Compose Button -->
<div class="mt-10 flex justify-center">
  <a 
    href="https://twitter.com/intent/tweet?text=I%20don’t%20tweet%20anymore.%0A%0AI%20Roar%20-%20with%20Clan%20McHODLer%20⚔️%20behind%20me.%0A%0APrivacy%20is%20power.%20Roar%20wisely.%0A%0AChoose%20your%20Clan%20%26%20join%20the%20waitlist%20👉%20clans.kilt.io/referral/1456xxxx"
    target="_blank"
    class="bg-[#1DA1F2] text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition"
  >
    Roar on Twitter
  </a>
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
