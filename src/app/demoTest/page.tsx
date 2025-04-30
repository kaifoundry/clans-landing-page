"use client";

import React, { useEffect } from "react";
import { createUser } from "@/lib/api";

const Page = () => {
  useEffect(() => {
    const createNewUser = async () => {
      const newUser = {
        name: "Yashika",
        email: "yashika@gmail.com",
      };
      try {
        const response = await createUser(newUser);
        console.log("User Created:", response);
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    };

    createNewUser();
  }, []); // Empty [] = run once when page loads

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Creating User...</h1>
    </div>
  );
};

export default Page;
