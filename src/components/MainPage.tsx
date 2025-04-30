"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button"; // Assuming your Button Component
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const provider = new TwitterAuthProvider();

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const router = useRouter();

  // Login function with Twitter
  // Inside your loginWithTwitter function:
  async function loginWithTwitter() {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Get credential from result
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const secret = credential?.secret;

      console.log("Twitter Access Token:", accessToken);
      console.log(
        "Twitter Secret (used as refresh token in OAuth 1.0a):",
        secret
      );

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            provider: user.providerId,
            createdAt: new Date(),
            twitterAccessToken: accessToken,
            twitterSecret: secret,
          });

          console.log("New user saved to Firestore with tokens");
        } else {
          console.log("User already exists in Firestore");
        }

        router.push("/startRoaring");
      }
    } catch (error) {
      console.error("Twitter login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Modal handling
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="relative bg-black overflow-hidden flex items-center justify-center h-screen text-white">
      {/* Video Background */}
      <div className="opacity-60">
        <video
          autoPlay
          loop
          muted={false} // Enable audio
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30 "
        >
          <source src="/videos/Main.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main container */}
      <div className="mx-auto relative w-full h-full text-center flex items-center justify-center flex-col z-10">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-10 z-20 flex-col ">
          <div className="flex gap-4 items-center justify-center">
            <Image
              src="/Images/gettingStarted/Object.png"
              width={80}
              height={80}
              alt="Object1"
              className="lg:w-40 lg:h-50 md:w-30 object-contain"
            />
            <Image
              src="/Images/gettingStarted/Line.png"
              width={1}
              height={1}
              alt="Line1"
              className="lg:w-2 lg:h-35 md:h-20 md:w-2 object-contain"
            />
            <Image
              src="/Images/gettingStarted/Clans.png"
              width={120}
              height={60}
              alt="Clans"
              className="lg:w-90 lg:h-50 md:w-50 object-contain "
            />
          </div>

          {/* Get Started Button */}
          <div className="mx-auto z-10 flex items-center justify-center">
            <Button
              ButtonText="Start Now"
              onClick={openModal}
              className="text-white text-2xl "
            />
          </div>
        </div>

        {/* Left Avatar */}

        <Image
          src="/Images/gettingStarted/avtar1.png"
          width={550}
          height={550}
          alt="Avatar Left"
          className="absolute bottom-0 left-0 w-[300px] md:w-[350px] xl:w-[550px] 2xl:w-[540px] object-contain z-10"
        />

        <Image
          src="/Images/gettingStarted/avtar2_.png"
          width={580}
          height={580}
          alt="Avatar Right"
          className="absolute bottom-0 right-0 w-[300px] md:w-[320px] xl:w-[550px] 2xl:w-[550px] object-contain z-10"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/Images/gettingStarted/logo.png"
                width={100}
                height={100}
                className="w-24 h-20 object-contain text-xl"
                alt="Object1"
              />
            </div>

            <h2 className="text-xl font-bold mb-4 text-black">
              Clans wants to access your X account
            </h2>

            {/* Authenticate Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={loginWithTwitter}
                className="bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Authenticating..." : "Authenticate"}
              </button>
            </div>

            {/* Cancel Text */}
            <p
              onClick={closeModal}
              className="text-sm text-gray-500 cursor-pointer underline mb-4"
            >
              Cancel
            </p>

            {/* Bottom Info */}
            <div className="text-left text-gray-600 text-sm border-t pt-4">
              <h3 className="font-semibold mb-2">
                Things this App can view...
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  All the posts you can view, including posts from protected
                  accounts.
                </li>
                <li>Any account you can view, including protected accounts.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainPage;
