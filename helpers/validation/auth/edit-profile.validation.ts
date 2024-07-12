import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(4, {
    message: "Name must be of 4 charecter ",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be of 4 charecter ",
  }),
  phoneNumber: z.string(),
  month: z.string(),
  day: z.string(),
  year: z.string(),
});

export const editProfileBackcendSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be of 4 charecter ",
  }),

  dob: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});
