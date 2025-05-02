const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//add api/auth/twitter this is for the twitter auth get request
export const getTwitterAuth = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/twitter`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};


export const createUser = async (userData: any) => {
  const res = await fetch(`${BASE_URL}/api/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const updateUser = async (userId: string, updateData: any) => {
  const res = await fetch(`${BASE_URL}/api/user/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  return res.json();
};

export const getUser = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/api/user/fetch/${userId}`);
  return res.json();
};

export const getAllClans = async () => {
  const res = await fetch(`${BASE_URL}/clans/fetch/all`);
  return res.json();
};

export const createClan = async (clanData: any) => {
  const res = await fetch(`${BASE_URL}/api/clans/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clanData),
  });
  return res.json();
};

export const joinClan = async (joinData: any) => {
  const res = await fetch(`${BASE_URL}/clans/JoinClan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinData),
  });
  return res.json();
};

//create one for this api/user/:userId/early-user post request
export const createEarlyUser = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/api/user/${userId}/early-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};  

// const handleTweet = async () => {
//   try {
//     const result = await postTweet(
//       "Check out this cool referral!", 
//       "ABC123", 
//       "user-xyz-id", 
//       selectedMediaFile // a File object from an <input type="file" />
//     );
//     console.log("✅ Tweet posted:", result);
//   } catch (error) {
//     alert("Failed to post tweet.");
//   }
// };


// This function posts a tweet with media to the server
// It uses FormData to send the tweet text, referral code, user ID, and media file

export const postTweet = async (
  text: string,
  referralCode: string,
  userId: string,
  media: File | Blob
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/twitter/Post-tweet`;

  const formData = new FormData();
  formData.append("text", text);
  formData.append("referralCode", referralCode);
  formData.append("userId", userId);
  formData.append("media", media); // Assuming media is a file or blob

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      // No headers needed; browser automatically sets 'Content-Type' to multipart/form-data
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong while posting the tweet.");
    }

    return data;
  } catch (error: any) {
    console.error("❌ Error posting tweet:", error);
    throw error;
  }
};
