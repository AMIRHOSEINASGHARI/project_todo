import api from "@/configs/api";

export const fetchSession = () => {
  return api.get(`/api/session`).then((res) => res.data);
};

export const fetchUserInfo = async (): Promise<{
  id: string;
  username: string;
  name: string;
  avatar: string | undefined;
}> => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  return response.json();
};
