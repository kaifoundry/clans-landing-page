"use client";

import { useEffect, useState } from "react";
import { getAllClans } from "@/lib/api";

export default function HomePage() {
  const [clans, setClans] = useState([]);

  useEffect(() => {
    getAllClans().then((data) => {
      console.log("Received Clans:", data);
      setClans(data);
    });
  }, []);

  return (
    <div>
      <h1>All Clans</h1>
      <ul>
        {/* {clans.map((clan, index) => (
          <li key={index}>{clan.name}</li>
        ))} */}
        sample text
      </ul>
    </div>
  );
}
