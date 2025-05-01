"use client";

import { useState, useEffect } from "react";
import StartRoaringDesktop from "@/components/startRoaringDesktop";
import StartRoaringMobilePage from "@/components/StartRoaringMobilePage";
import { getUser } from "@/lib/api";

function StartRoaring() {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<any>(null); // Store user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Example: Assume we have a userId (can come from params, localStorage, etc.)
  const userId = "abc123"; 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const data = await getUser(userId);
        setUser(data); // Store user data in state
        localStorage.setItem("user", JSON.stringify(data)); // Save user data to localStorage
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    // Fetch user data when the component mounts
    fetchUserData();

    // Call the resize handler
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [userId]);

  // If loading, show a loader or spinner
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there's an error fetching user
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Determine which component to render based on the device type
  return isMobile ? <StartRoaringMobilePage /> : <StartRoaringDesktop />;
}

export default StartRoaring;
