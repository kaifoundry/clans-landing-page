"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ClanLogo from "@/components/ClanLogoMobile";

const JoinWaitlist = () => {
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const [userData, setUserData] = useState<{ userId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Get user data from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        console.log("User data loaded from localStorage:", parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        toast.error("Unable to load user data. Please try logging in again.");
      }
    } else {
      console.log("No user data found in localStorage");
      toast.error("Please log in to join the waitlist");
    }
  }, []);

  const handleJoinWaitlist = async () => {
    if (!userData || !userData.userId) {
      toast.error("User ID not found. Please login again.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/earlyUser?userId=${params.userId}&tweetId=${params.tweetId}`;
      console.log("Constructed API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          userId: userData.userId,
        })
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: `Server error: ${response.status}` };
        }

        throw new Error(
          errorData.message || `Failed to join waitlist: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("✅ Successfully joined waitlist:", data);
      
      // Check if user is already an early user
      if (data.message && data.message.includes("is already an early user")) {
        toast.success("You're already on the waitlist!");
      router.push("/ConfirmationPage");

      } else {
        toast.success("Successfully joined the waitlist!");
      router.push("/ConfirmationPage");

      }

      // Redirect to confirmation page in both cases
    } catch (error) {
      console.error("❌ Error joining waitlist:", error);
        toast.error(
          (error instanceof Error
            ? error.message
            : "An unknown error occurred") ||
            "Failed to join waitlist. Please try again."
        );
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasMounted) {
    return null; // or a loading spinner, etc.
  }

  return (
    <section className="md:bg-[url('/Images/joinWaitlist/background.png')] bg-[url('/Images/joinWaitlist/MobileBackground.png')] bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center justify-center p-10 md:gap-16 gap-16">
      <div className="flex w-64 h-24 items-center mt-10 md:gap-6 gap-4">
        {/* <Image
          src="/Images/gettingStarted/Object.png"
          width={100}
          height={100}
          className="md:w-20 h-30 object-contain w-15"
          alt="Object1"
          draggable={false}
          priority
        />

        <Image
          src="/Images/gettingStarted/Clans.png"
          width={100}
          height={100}
          className="md:w-40 h-25 object-contain"
          alt="Clans"
          draggable={false}
          priority
        /> */}
        <ClanLogo />
      </div>

      <div className="flex flex-col items-center md:gap-6 gap-4">
        <h1 className="text-[28px] md:text-6xl lg:text-[104px] lg:font-bold font-semibold text-white text-nowrap md:pb-[35px]">
          Early Roarers get the edge!
        </h1>

        <p className="text-center text-white text-[18px] md:text-2xl font-medium">
          Get early access, exclusive rewards, and bragging rights.
          <br />
          The battle for the timeline starts soon.
        </p>
      </div>

      <Button
        ButtonText={isLoading ? "Processing..." : "Join Waitlist"}
        onClick={handleJoinWaitlist}
        disabled={isLoading || !userData}
        width={270}
        height={75}
      />

      {!userData && (
        <p className="text-yellow-300 text-sm">
          You need to be logged in to join the waitlist
        </p>
      )}
    </section>
  );
};

export default JoinWaitlist;
