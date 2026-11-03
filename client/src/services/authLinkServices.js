const API_URL = import.meta.env.VITE_API_URL;

export const signupFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const loginFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const logoutFromServer = async () => {
  const response = await fetch(`${API_URL}/api/user/postLogout`, {
    method: "post",
    credentials: "include",
  });
  return await response.json();
};

export const authStatus = async () => {
  const response = await fetch(`${API_URL}/api/user/status`, {
    credentials: "include",
  });

  return await response.json();
};

export const usernameStatus = async ({ username }) => {
  const response = await fetch(
    `${API_URL}/api/user/usernameStatus/${username}`,
    {
      credentials: "include",
    },
  );

  return await response.json();
};
