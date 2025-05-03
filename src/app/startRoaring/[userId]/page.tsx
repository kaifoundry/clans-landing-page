"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import StartRoaringMobile from "@/components/StartRoaringMobilePage"; // Ensure this path is correct
import StartRoaringDesktop from "@/components/startRoaringDesktop"; // Ensure this path is correct

export default function StartRoaring() {
  // State for mobile/desktop view and the user ID
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Initialize userId as null

  // Get route parameters
  const params = useParams();

  // Effect to extract and set the userId from route parameters
  useEffect(() => {
    const userIdFromParams = params?.userId; // Safely access userId from params

    if (userIdFromParams) {
      // Determine the ID (handle potential array, though less likely for simple routes)
      const id = Array.isArray(userIdFromParams)
        ? userIdFromParams[0]
        : userIdFromParams;

      // Set the userId state *only if it's different* from the current value
      // Note: React's useState setter already optimizes for this, but being explicit can help clarity.
      setUserId((currentUserId) => (currentUserId !== id ? id : currentUserId));
    }
    // --- CORRECTED DEPENDENCY ---
    // Only re-run this effect if the actual 'userId' value from params changes.
  }, [params?.userId]);

  // Effect to handle window resizing for mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      // Update state based on window width
      setIsMobile(window.innerWidth <= 768);
    };

    // Run on initial load to set the correct view
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);

    // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount
  }, []);

  // Render a loading state until the userId has been determined
  // Use explicit null check for clarity
  if (userId === null) {
    return <p>Loading...</p>; // Or replace with a proper loading spinner component
  }

  // Render the appropriate component based on screen size, passing userId if needed
  return isMobile ? (
    // Assuming the Mobile component doesn't need userId directly passed as a prop
    <StartRoaringMobile userId={userId} />
  ) : (
    // Pass the determined userId to the Desktop component
    <StartRoaringDesktop userId={userId} />
  );
}
