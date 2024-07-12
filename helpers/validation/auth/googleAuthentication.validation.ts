import { z } from "zod";

export const googleSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be of 2 charecter ",
  }),
  email: z.string().email(),
  uid: z.string().min(5, {
    message: "localId must be of 8 charecter ",
  }),
});
