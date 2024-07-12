import { z } from "zod";
import api from "..";
import { googleSchema } from "@/helpers/validation/auth/googleAuthentication.validation";
import { editProfileBackcendSchema } from "@/helpers/validation/auth/edit-profile.validation";

export const getCurrentUser = async () => {
  const { data } = await api.get("/api/auth/me");
  return data;
};

export const socialLoginApi = async (body: z.infer<typeof googleSchema>) => {
  const { data } = await api.post("/api/auth/social", body);
  return data;
};

export const updateUserProfile = async (
  body: z.infer<typeof editProfileBackcendSchema>
) => {
  const { data } = await api.patch("/api/user", body);
  return data;
};
