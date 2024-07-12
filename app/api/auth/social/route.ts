import admin from "@/helpers/firebase/initializeFirebase";
import JwtService from "@/helpers/token/token.service";
import { googleSchema } from "@/helpers/validation/auth/googleAuthentication.validation";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, uid, name } = googleSchema.parse(body);
    const token = await JwtService.generateTokenForUser({
      uid: uid,
      email: email,
      displayname: name,
    });

    const userQuerySnapshot = await admin
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();
    if (userQuerySnapshot.empty) {
      await admin.firestore().collection("users").doc(uid).set({
        name,
        email,
        dob: null,
        phoneNumber: null,
      });
    }
    return NextResponse.json({
      token,
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Provide the valid field", success: false },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { message: "Unable to create a user", success: false },
      { status: 500 }
    );
  }
}
