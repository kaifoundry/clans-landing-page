'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function NotFoundContent() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white'>
      <h1 className='mb-4 text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mb-8 text-lg'>
        The page you are looking for does not exist.
      </p>
      <Link
        href={returnUrl}
        className='rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700'
      >
        Return Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<></>}>
      <NotFoundContent />
    </Suspense>
  );
}
