"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Link 
        href={returnUrl}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
} 