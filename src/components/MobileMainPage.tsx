"use client";

import ClanLogo from "./ClanLogo";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

import { useState, useEffect } from "react";

import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation"; // Correctly imported useSearchParams

const provider = new TwitterAuthProvider();

export default function MobileMainPage() {
  return (
    <>
      <section className="w-full min-h-screen overflow-hidden">
        <div className="opacity-60">
          <video
            autoPlay
            loop
            muted={false} // Enable audio
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30 "
          >
            <source src="/Videos/Main.mp4" type="video/mp4" />
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
              width={500}
              height={100}
              alt="avtar1"
              className="z-1 absolute bottom-0 w-[300px] h-[550px]"
            />
            <div className="mx-auto z-10 absolute bottom-10 w-full flex items-center justify-center">
              <Link href="/startRoaring" prefetch>
                <Button ButtonText="Start Now" className="text-xl" />
              </Link>
            </div>

            <Image
              src="/Images/gettingStarted/mobileavtar2.png"
              width={400}
              height={200}
              alt="avtar2"
              className="absolute right-2 h-[600px] w-[250px] bottom-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
