import api from "..";

export const getFeatureHotels = async () => {
  const { data } = await api.get("/api/hotels");
  return data;
};
export const getSingleHotels = async (id: string) => {
  const { data } = await api.get(`/api/hotels/${id}`);
  return data;
};
