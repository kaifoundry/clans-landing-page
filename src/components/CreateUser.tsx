"use client";
import { createUser } from "@/lib/api";

const handleSubmit = async () => {
  const newUser = {
    name: "Yashika",
    email: "yashika@gmail.com",
  };

  const response = await createUser(newUser);
  console.log("User Created:", response);
};
