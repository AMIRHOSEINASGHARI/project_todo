import api from "@/configs/api";

export const fetchSession = () => {
  return api.get(`/api/session`).then((res) => res.data);
};
