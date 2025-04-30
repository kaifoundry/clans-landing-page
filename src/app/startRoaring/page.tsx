"use client";

import { useState, useEffect } from "react";
import StartRoaringDesktop from "@/components/startRoaringDesktop";
import StartRoaringMobilePage from "@/components/StartRoaringMobilePage";

function StartRoaring() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <StartRoaringMobilePage /> : <StartRoaringDesktop />;
}

export default StartRoaring;
