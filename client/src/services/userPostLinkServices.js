const API_URL = import.meta.env.VITE_API_URL;

export const createPostFromServer = async (data) => {
  const formData = new FormData();
  formData.append("content", data.content);
  if (data.postImage && data.postImage[0]) {
    formData.append("postImage", data.postImage[0]);
  }

  const response = await fetch(`${API_URL}/api/user/profile/create-post`, {
    method: "post",
    credentials: "include",
    body: formData,
  });

  return await response.json();
};

export const getPostFromServer = async () => {
  const response = await fetch(`${API_URL}/api/user/profile/posts`, {
    credentials: "include",
  });

  return await response.json();
};

export const deletePostFromServer = async (data) => {
  const response = await fetch(`${API_URL}/api/user/profile/post/delete`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getAllPostsFromServer = async (skip) => {
  const response = await fetch(`${API_URL}/api/user/getallPost/${skip}`, {
    credentials: "include",
  });

  return await response.json();
};

export const putLikesFromServer = async (postId) => {
  const response = await fetch(`${API_URL}/api/user/post/${postId}`, {
    method: "put",
    credentials: "include",
  });

  return await response.json();
};

export const postImpressionFromServer = async (postId) => {
  const response = await fetch(
    `${API_URL}/api/user/post/impression/${postId}`,
    {
      method: "put",
      credentials: "include",
    },
  );

  return await response.json();
};
