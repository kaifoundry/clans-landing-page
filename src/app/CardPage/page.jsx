"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation"; // To programmatically navigate
import { useClan } from "@/context/ClanContext";

export default function CardPage() {
  const { selectedCard } = useClan();
  const router = useRouter();

  if (!selectedCard) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">No Clan Selected!</h1>
      </div>
    );
  }

  // Construct tweet content dynamically based on selectedCard title and description
  // Changed to backticks for template literal and corrected the string content
  const tweetContent = `I don’t tweet anymore. I Roar - with Clan ${selectedCard.title} ⚔ behind me. Privacy is power. Roar wisely. Choose your Clan & join the waitlist 👉 ${selectedCard.description}`;

  // Construct the absolute URL for the image
  // Changed to backticks for template literal
  const fullImageURL = `${window.location.origin}${selectedCard.cardImage}`; // Create full URL for the image

  // Construct Twitter URL with the encoded tweet content and absolute image URL
  const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetContent
  )}&url=${encodeURIComponent(fullImageURL)}`; // Use fullImageURL in the url parameter

  // Function to handle Twitter share
  const handleShareClick = () => {
    window.open(twitterShareURL, "_blank", "width=600,height=400");
  };

  // Function to handle Continue button click
  const handleContinueClick = () => {
    // Navigate to another page or handle any other logic before or after sharing.
    handleShareClick(); // Call the share function when "Continue" is clicked (as per original logic)
    router.push("/JoinWaitlist"); // Navigate to JoinWaitlist page after sharing
  };

  return (
    <section className="main-section p-4">
      <div className="flex flex-col items-center justify-center py-5 px-5  ">
        <h1 className="md:text-5xl font-bold mb-10 text-3xl">
          You are now certified{" "}
          <span className="text-purple-500">Clans Roarer!</span>
        </h1>
        <div
          className="rounded-xl opacity-70 backdrop-blur-2xl 2xl:w-[1300px] xl:h-[542px] xl:w-[1200px] md:w-[700px] h-[400px] w-[400px] relative"
          style={{
            backgroundColor: selectedCard.glowColor,
          }}
        >
          <div className="absolute inset-[20px] rounded-xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center">
            <div className="flex flex-col p-10 gap-y-10">
              <div className="flex flex-row">
                <Image
                  src="/Images/cardPage/avtar_1.png"
                  alt="userProfilePic"
                  height={100}
                  width={100}
                  className="rounded-full h-20 w-20 border-white border-2"
                />

                <div className="flex flex-col py-4 px-2">
                  <p>Yashika</p> {/* Placeholder name/email */}
                  <p>yashika@gmail.com</p> {/* Placeholder name/email */}
                </div>
              </div>

              <p className="">
                I don’t tweet anymore. I Roar - with Clan {selectedCard.title}{" "}
                behind me.
                <br />
                Privacy is power. Roar wisely.
              </p>

              <div className="">
                <h1 className="text-purple-500 text-4xl font-semibold">
                  {selectedCard.title}
                </h1>
                <p className="text-lg">{selectedCard.description}</p>
              </div>
              {/* Assuming these images are part of the card design */}
              <div className="hidden lg:flex items-center mt-10 gap-2">
                <Image
                  src="/Images/gettingStarted/Object.png"
                  width={100}
                  height={100}
                  className="w-10 h-20 object-contain"
                  alt="Object1"
                />
                <Image
                  src="/Images/gettingStarted/Clans.png"
                  width={100}
                  height={100}
                  className="w-20 h-15 object-contain"
                  alt="Clans"
                />
              </div>
            </div>
            <Image
              src={selectedCard.cardImage}
              alt="Avatar_1" // Alt text should be descriptive
              width={450} // Set appropriate width
              height={300} // Set appropriate height
              className="absolute bottom-0 right-0 h-[250px] w-[220px] xl:w-1/3 xl:h-[90%]"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
          {/* Assuming this button is for Sharing on Twitter */}
          <Button ButtonText="Share on Twitter" onClick={handleShareClick} />
          {/* Updated "Continue" button to trigger the share function and navigate */}
          <Button ButtonText="Continue" onClick={handleContinueClick} />
        </div>
      </div>
    </section>
  );
}