const BASE_URL = "http://128.199.16.207";

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
  const res = await fetch(`${BASE_URL}/api/clans/fetch/all`);
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
