const BASE_URL = "https://clans.10on10studios.com";

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



// export const createUser = async (userData: any) => {
//   const res = await fetch(`${BASE_URL}/api/user/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
//   return res.json();
// };

// export const updateUser = async (userId: string, updateData: any) => {
//   const res = await fetch(`${BASE_URL}/api/user/update/${userId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updateData),
//   });
//   return res.json();
// };

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
  const res = await fetch(`${BASE_URL}/api/clans/JoinClan`, {
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

