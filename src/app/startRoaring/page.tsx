// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams } from "next/navigation";

// import StartRoaringMobile from "@/components/StartRoaringMobilePage"; // Ensure this path is correct
// import StartRoaringDesktop from "@/components/startRoaringDesktop"; // Ensure this path is correct

// // Debounce function to limit how often a function can be called
// const debounce = (func: Function, wait: number) => {
//   let timeout: NodeJS.Timeout;
//   return function executedFunction(...args: any[]) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

// export default function StartRoaring() {
//   // State for mobile/desktop view and the user ID
//   const [isMobile, setIsMobile] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null); // Initialize userId as null

//   // Get route parameters
//   const params = useParams();

//   // Memoize the userId update function
//   const updateUserId = useCallback(() => {
//     const userIdFromParams = params?.userId;
//     if (userIdFromParams) {
//       const id = Array.isArray(userIdFromParams)
//         ? userIdFromParams[0]
//         : userIdFromParams;
//       setUserId((currentUserId) => (currentUserId !== id ? id : currentUserId));
//     }
//   }, [params?.userId]);

//   // Effect to extract and set the userId from route parameters
//   useEffect(() => {
//     updateUserId();
//   }, [updateUserId]);

//   // Memoize the resize handler with debounce
//   const handleResize = useCallback(
//     debounce(() => {
//       setIsMobile(window.innerWidth <= 768);
//     }, 100),
//     []
//   );

//   // Effect to handle window resizing for mobile/desktop view
//   useEffect(() => {
//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [handleResize]);

//   // Memoize the loading state
//   const loadingContent = useMemo(() => {
//     if (userId === null) {
//       return (
//         <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
//           <div className="text-white text-xl">Loading...</div>
//         </div>
//       );
//     }
//     return null;
//   }, [userId]);

//   // Memoize the main content
//   const mainContent = useMemo(() => {
//     if (userId === null) return null;

//     return isMobile ? (
//       <StartRoaringMobile userId={userId} />
//     ) : (
//       <StartRoaringDesktop userId={userId} />
//     );
//   }, [isMobile, userId]);

//   return (
//     <>
//       {loadingContent}
//       {mainContent}
//     </>
//   );
// }







"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";

import StartRoaringMobile from "@/components/StartRoaringMobilePage"; // Ensure this path is correct
import StartRoaringDesktop from "@/components/startRoaringDesktop"; // Ensure this path is correct

// Debounce function to limit how often a function can be called
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function StartRoaring() {
  // State for mobile/desktop view and the user ID
  const [isMobile, setIsMobile] = useState(false);

  // Memoize the resize handler with debounce
  const handleResize = useCallback(
    debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 100),
    []
  );

  // Effect to handle window resizing for mobile/desktop view
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Memoize the loading state
  // const loadingContent = useMemo(() => {
  //   if (userId === null) {
  //     return (
  //       <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
  //         <div className="text-white text-xl">Loading...</div>
  //       </div>
  //     );
  //   }
  //   return null;
  // }, [userId]);

  // Memoize the main content
  // const mainContent = useMemo(() => {
  //   if (userId === null) return null;

  //   return isMobile ? (
  //     <StartRoaringMobile userId={userId} />
  //   ) : (
  //     <StartRoaringDesktop userId={userId} />
  //   );
  // }, [isMobile, userId]);

  return isMobile ? <StartRoaringMobile /> : <StartRoaringDesktop />;
}

