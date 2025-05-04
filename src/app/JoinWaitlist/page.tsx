"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const JoinWaitlist = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{ userId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage(
          "Unable to load user data. Please try logging in again."
        );
      }
    } else {
      console.log("No user data found in localStorage");
      setErrorMessage("Please log in to join the waitlist");
    }
  }, []);

  const handleJoinWaitlist = async () => {
    if (!userData || !userData.userId) {
      setErrorMessage("User ID not found. Please login again.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userData.userId}/early-user`;

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // Add any additional data needed in the request body
        body: JSON.stringify({
          userId: userData.userId,
        }),
      });

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

      // Successful redirect
      router.push("/ConfirmationPage");
    } catch (error) {
      console.error("❌ Error joining waitlist:", error);
      setErrorMessage(
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
    <section className="bg-[url('/Images/joinWaitlist/background.png')] bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center justify-center p-10 md:gap-16 gap-16">
      <div className="flex items-center mt-10 md:gap-6 gap-4">
        <Image
          src="/Images/gettingStarted/Object.png"
          width={100}
          height={100}
          className="md:w-20 h-30 object-contain w-15"
          alt="Object1"
        />

        <Image
          src="/Images/gettingStarted/Clans.png"
          width={100}
          height={100}
          className="md:w-40 h-25 object-contain"
          alt="Clans"
        />
      </div>

      <div className="flex flex-col items-center md:gap-6 gap-4">
        <h1 className="lg:text-7xl text-2xl font-bold text-white  md:text-5xl">
          Early Roarers get the edge!
        </h1>

        <p className="text-center text-white md:text-2xl">
          Get early access, exclusive rewards,
          <br />
          and bragging rights.
          <br />
          The battle for the timeline starts soon.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
          {errorMessage}
        </div>
      )}

      <Button
        ButtonText={isLoading ? "Processing..." : "Join Waitlist"}
        onClick={handleJoinWaitlist}
        disabled={isLoading || !userData}
        width={280}
        height={60}
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
