"use client";

import { useState, useEffect, useMemo } from "react";
import SelectClanDesktop from "@/components/SelectClanDesktop";
import SelectClanMobile from "@/components/SelectClanMobile";

export default function StartRoaring() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add debounced resize listener
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const isMobile = useMemo(() => windowWidth <= 768, [windowWidth]);

  return isMobile ? <SelectClanMobile /> : <SelectClanDesktop />;
}
