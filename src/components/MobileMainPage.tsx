"use client";

import ClanLogo from "./ClanLogo";
import Image from "next/image";
import Button from "./Button";
// Removed Link import

import { useState, useEffect } from "react";

import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Ensure firebase auth/db is correctly imported
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const provider = new TwitterAuthProvider();

export default function MobileMainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const router = useRouter();

  const [redirectTo, setRedirectTo] = useState<string | null>("/startRoaring");

  // Update redirectTo based on query params

  // Login function with Twitter
  // async function () {
  //   try {
  //     setIsLoading(true);
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     // ✅ Get credential from result
  //     const credential = TwitterAuthProvider.credentialFromResult(result);
  //     const accessToken = credential?.accessToken;
  //     const secret = credential?.secret;

  //     console.log("Twitter Access Token:", accessToken);
  //     console.log(
  //       "Twitter Secret (used as refresh token in OAuth 1.0a):",
  //       secret
  //     );

  //     if (user) {
  //       const userRef = doc(db, "users", user.uid);
  //       const userSnap = await getDoc(userRef);

  //       if (!userSnap.exists()) {
  //         await setDoc(userRef, {
  //           name: user.displayName,
  //           email: user.email,
  //           photoURL: user.photoURL,
  //           uid: user.uid,
  //           provider: user.providerId,
  //           createdAt: new Date(),
  //           twitterAccessToken: accessToken,
  //           twitterSecret: secret,
  //         });

  //         console.log("New user saved to Firestore with tokens");
  //       } else {
  //         console.log("User already exists in Firestore");
  //         // Optionally update tokens if needed, but not strictly necessary for basic login
  //         // await setDoc(userRef, { twitterAccessToken: accessToken, twitterSecret: secret }, { merge: true });
  //       }

  //       // Close modal and then navigate
  //       closeModal();
  //       router.push(redirectTo || "/startRoaring");
  //     }
  //   } catch (error) {
  //     console.error("Twitter login error:", error);
  //     alert("An error occurred during login. Please try again.");
  //     // Ensure modal is closed and loading is set to false on error
  //     closeModal();
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const loginWithTwitter = () => {
    if (typeof window === "undefined") return; // Ensure this is running on the client

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_API_BASE_URL");
      return;
    }

    // Use location.assign to ensure full redirect (especially helpful on mobile)
    window.location.assign(`${baseUrl}/api/auth/twitter`);
  };
  // Modal handling
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="w-full min-h-screen overflow-hidden">
        <div className="opacity-60">
          <video
            autoPlay
            loop
            muted={false} // Enable audio (adjust if you want it muted)
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30 "
          >
            <source src="/videos/Main.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative flex flex-col h-screen ">
          <div className="mt-20">
            <ClanLogo />
          </div>

          <div className="flex justify-between w-full absolute bottom-0 overflow-hidden h-full">
            <Image
              src="/Images/gettingStarted/mobileavtar1.png"
              width={500} // Adjust width/height as needed, ensure consistent aspect ratio
              height={550}
              alt="avtar1"
              className="z-1 absolute bottom-0 w-[300px] h-[600px] object-contain  scale-105" // Added object-contain for better image scaling
            />
            <div className="mx-auto z-10 absolute bottom-10 w-full flex items-center justify-center">
              {/* Removed Link wrapper */}
              <Button
                ButtonText="Start Now !"
                className="text-xl"
                onClick={openModal} // Only open modal on click
              />
            </div>

            <Image
              src="/Images/gettingStarted/mobileavtar2.png"
              width={400} // Adjust width/height as needed, ensure consistent aspect ratio
              height={600}
              alt="avtar2"
              className="absolute right-0 h-[620px] w-[260px] bottom-0 object-contain scale-110" // Added object-contain
            />
          </div>
        </div>

        {/* Modal - This structure is already present and seems correctly copied */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative">
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/Images/gettingStarted/logo.png"
                  width={100}
                  height={100}
                  className="w-24 h-20 object-contain text-xl"
                  alt="Clans Logo" // More descriptive alt text
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
                  <li>
                    Any account you can view, including protected accounts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
