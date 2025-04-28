"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "./Button"; // Assuming your Button Component
import { auth } from "@/lib/firebase";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const loginWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      closeModal();
    } catch (error) {
      console.error("Twitter Login Error:", error);
    }
  };

  return (
    <section className="relative h-dvh bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden">
      {/* Main container */}
      <div className="mx-auto relative w-full h-full text-center flex items-center justify-center flex-col">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-4 z-20">
          <Image
            src="/Images/gettingStarted/Object.png"
            width={80}
            height={80}
            alt="Object1"
            className="lg:w-40 lg:h-40 md:w-30 object-contain"
          />
          <Image
            src="/Images/gettingStarted/Line.png"
            width={1}
            height={1}
            alt="Line1"
            className="lg:w-1 lg:h-30 md:h-20 md:w-2 object-contain"
          />
          <Image
            src="/Images/gettingStarted/Clans.png"
            width={120}
            height={60}
            alt="Clans"
            className="lg:w-70 lg:h-30 md:w-50 object-contain"
          />
        </div>

        {/* Get Started Button */}
        <div className="mx-auto z-10 absolute bottom-50 flex items-center justify-center">
          <Button ButtonText="Get Started" onClick={openModal} />
        </div>

        {/* Left Avatar */}
        <Image
          src="/Images/gettingStarted/avtar1.png"
          width={550}
          height={550}
          alt="Avatar Left"
          className="absolute bottom-0 left-0 w-[300px] md:w-[350px] xl:w-[550px] 2xl:w-[600px] object-contain z-10"
        />

        {/* Right Avatar */}
        <Image
          src="/Images/gettingStarted/avtar2.png"
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
              >
                Authenticate
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
