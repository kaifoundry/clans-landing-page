"use client"; // Ensure it works in Next.js 13+ with client-side rendering

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";

const CardPreview = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // To manage the image preview URL

  // Cloudinary credentials
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dygjmunqp/image/upload";
  const UPLOAD_PRESET = "twitter_card_upload"; // Your Cloudinary upload preset

  const handleDownload = async () => {
    if (!cardRef.current) return;

    // Step 1: Capture the card as an image
    const dataUrl = await toPng(cardRef.current);

    // Step 2: Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", "dygjmunqp"); // Your Cloudinary cloud name

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    const cloudinaryImageUrl = result.secure_url; // Get the image URL from Cloudinary
    setImageUrl(cloudinaryImageUrl); // Set the uploaded image URL to state

    // Step 3: Prepare the tweet
    const tweetText = "Check out my cool card! 🃏"; // Text for the tweet
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(cloudinaryImageUrl)}`;

    // Step 4: Open Twitter compose box with image
    window.open(tweetUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Card Preview */}
      <div
        ref={cardRef}
        className="p-6 bg-white shadow-lg rounded-xl w-full max-w-md text-center"
      >
        <h1 className="text-2xl font-bold text-purple-600">Card Title</h1>
        {/* Card Image */}
        <img
          src={imageUrl || "/Images/gettingStarted/avtar1.png"} // Display uploaded image or a placeholder
          alt="Card Image"
          className="w-full h-64 object-cover rounded-md mt-4"
        />
        <p className="mt-4 text-gray-600">
          This is a brief description of the card. You can add any content here.
        </p>
      </div>

      {/* Share Button */}
      <button
        onClick={handleDownload}
        className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
      >
        Share on Twitter
      </button>
    </div>
  );
};

export default CardPreview;
