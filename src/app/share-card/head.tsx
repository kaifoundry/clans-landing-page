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
      <meta
        property='og:image'
        content='https://clans.kilt.io/Images/gettingStarted/clansLogoog.png'
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
        content='https://clans.kilt.io/Images/gettingStarted/clansLogoog.png'
      />
    </>
  );
}
