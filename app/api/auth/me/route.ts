import { NextResponse } from "next/server";
import { headers } from "next/headers";
import JwtService from "@/helpers/token/token.service";
import admin from "@/helpers/firebase/initializeFirebase";

export async function GET(req: Request) {
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
      const userData = userQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json(
        { success: true, data: userData[0] },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "token Expired", success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to get a user", success: false },
      { status: 500 }
    );
  }
}
