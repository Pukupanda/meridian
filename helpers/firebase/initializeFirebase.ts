import admin from "firebase-admin";
import { getApps } from "firebase/app";
import path from "path";

// const serviceAccount = require(process.env
//   .NEXT_PUBLIC_FIREBASE_BACKEND_LOCATION as string);

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_ADMIN_TYPE!,
  project_id: process.env.NEXT_PUBLIC_ADMIN_PROJECT_ID!,
  private_key_id: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY_ID!,
  private_key: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY!.replace(
    /\\n/g,
    "\n"
  )!,
  client_email: process.env.NEXT_PUBLIC_ADMIN_CLIENT_EMAIL!,
  client_id: process.env.NEXT_PUBLIC_ADMIN_CLIENT_ID!,
  auth_uri: process.env.NEXT_PUBLIC_ADMIN_AUTH_URI!,
  token_uri: process.env.NEXT_PUBLIC_ADMIN_TOKEN_URI!,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_ADMIN_AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url: process.env.NEXT_PUBLIC_ADMIN_CLIENT_X509_CERT_URL!,
};

// const serviceAccount = path.join(
//   `${__dirname}/../../../../../../helpers/firebase/config/firebase.setup.json`
// );

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export const firestoredb = admin.firestore();

export default admin;
