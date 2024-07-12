import { z } from "zod";
import api from "..";
export const getAllCities = async (keyword: string) => {
  const { data } = await api.get(`/api/city?keyword=${keyword}`);
  return data;
};
