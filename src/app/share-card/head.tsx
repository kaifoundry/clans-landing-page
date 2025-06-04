export default function Head() {
  return (
    <>
      <title>Clans Roar</title>
      <meta name='description' content='Join the Clans and Roar Louder!' />

      {/* Open Graph */}
      <meta property='og:title' content='Clans Roar' />
      <meta
        property='og:description'
        content='Pick your clan and roar with pride.'
      />
      {/* <meta
        property='og:image'
        content='https://clans.kilt.io/Images/gettingStarted/clansLogo.png'
      /> */}
      <meta
        property='og:image'
        content='https://ogcdn.net/389fd825-0066-4385-88a6-eb65cf4034c1/v1/https%3A%2F%2Fclans.kilt.io/Claim%20your%20Web3%20name%2C%20manage%20decentralized%20credentials%2C%20and%20verify%20your%20identity%20using%20the%20KILT%20Protocol.%20Join%20Clans%20now./https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2Fb52c0238-25b7-487f-adda-b9c949af1c50.png%3Ftoken%3DcDNRT0VlBhaiHH998ozBdLJtni-McAaH4Rpda7-B_6Y%26height%3D224%26width%3D224%26expires%3D33284969240/rgba(0%2C0%2C0%2C1)/og.png'
      />
      <meta
        property='og:url'
        content='https://clans-landing-page.vercel.app/share-card'
      />
      <meta property='og:type' content='website' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='Clans Roar' />
      <meta
        name='twitter:description'
        content='Pick your clan and roar with pride.'
      />
      <meta
        name='twitter:image'
        content='https://clans.kilt.io/Images/gettingStarted/clansLogo.png'
      />
    </>
  );
}
