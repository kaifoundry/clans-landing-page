"use client";

import { useState, useEffect } from "react";
import SelectClanDesktop from "@/components/SelectClanDesktop";
import SelectClanMobile from "@/components/SelectClanMobile";
import ConfirmationPageDesktop from "@/components/ConfirmationPageDesktop";
import ConfirmationPageMobile from "@/components/ConfirmationPageMobile";

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

  return isMobile ? <ConfirmationPageMobile /> : <ConfirmationPageDesktop />;
}
