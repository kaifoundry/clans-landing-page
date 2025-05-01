import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const clanData = await getClanById(params.id); // mock function for now

  return {
    title: clanData.name,
    description: clanData.description,
    openGraph: {
      title: clanData.name,
      description: clanData.description,
      images: [clanData.image],
    },
    twitter: {
      card: "summary_large_image",
      title: clanData.name,
      description: clanData.description,
      images: [clanData.image],
      site: "@YourAppHandle",
    },
  };
}

export default function ShareClanPage({ params }: Props) {
  return (
    <div
      style={{
        width: 600,
        height: 314,
        border: "8px solid #FF5733",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "white",
      }}
    >
      <h1>Clan Card ID: {params.id}</h1>
    </div>
  );
}

// Temporary mock data function
async function getClanById(id: string) {
  return {
    name: "Clan McHODLer",
    description: "Diamond hands forever. Join the resistance.",
    image: `https://yourdomain.com/images/clan-${id}.jpg`,
  };
}
