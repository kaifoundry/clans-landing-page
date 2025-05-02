"use client";

import { useState, useEffect } from "react";

import StartRoaringMobile from "@/components/StartRoaringMobilePage";
import StartRoaringDesktop from "@/components/startRoaringDesktop";

export default function StartRoaring() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <StartRoaringMobile /> : <StartRoaringDesktop />;
}
