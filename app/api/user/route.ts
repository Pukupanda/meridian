import { NextResponse } from "next/server";
import { headers } from "next/headers";
import JwtService from "@/helpers/token/token.service";
import admin from "@/helpers/firebase/initializeFirebase";
import { editProfileBackcendSchema } from "@/helpers/validation/auth/edit-profile.validation";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const headersList = headers();
    const authorization = headersList.get("authorization")?.split(" ")[1];
    if (authorization) {
      const user = await JwtService.decodeToken(authorization);
      const email = user.email;

      const userQuerySnapshot = await admin
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userQuerySnapshot.empty) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id;

      const requestBody = await req.json();
      const body = editProfileBackcendSchema.parse(requestBody);

      await admin.firestore().collection("users").doc(userId).update(body);

      return NextResponse.json(
        { message: "User updated successfully", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Token expired", success: false },
        { status: 401 }
      );
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Provide the valid field", success: false },
        { status: 422 }
      );
    }
    return NextResponse.json(
      {
        message: "Unable to update user",
        success: false,
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
