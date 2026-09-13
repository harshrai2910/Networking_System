const API_URL = import.meta.env.VITE_API_URL;

export const userDataFromServer = async () => {
  const response = await fetch(`${API_URL}/api/user/profile`, {
    credentials: "include",
  });

  return await response.json();
};

export const completeDatafromServer = async (data) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("course", data.course);
  formData.append("gradYear", data.gradYear);
  formData.append("headline", data.headline);
  formData.append("about", data.about);
  formData.append("achievements", data.achievements);
  formData.append("links", JSON.stringify(data.links));
  formData.append("skills", JSON.stringify(data.skills));

  if (data.profile && data.profile[0]) {
    formData.append("profile", data.profile[0]);
  }

  const response = await fetch(`${API_URL}/api/user/profile/complete`, {
    method: "post",
    credentials: "include",
    body: formData,
  });

  return await response.json();
};

export const languageDataFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/user/profile/language`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const deleteSkillFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/user/profile/skills/delete`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const updateSkillFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/user/profile/skills/update`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await response.json();
};
