const DemoPage = () => {
  const shareURL = `https://twitter.com/intent/tweet?text=I Roar - with Clan McHODLer ⚔️ behind me. Privacy is power. Roar wisely. Choose your Clan 👉 https://clans-landing-page.vercel.app/&url=https://clans-landing-page.vercel.app/&hashtags=Clans,Web3&via=yourhandle`;

  return (
    <a href={shareURL} target="_blank" rel="noopener noreferrer">
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
        Share on Twitter
      </button>
    </a>
  );
};

export default DemoPage;
