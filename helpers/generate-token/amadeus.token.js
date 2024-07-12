import axios from "axios";
import Cookies from "js-cookie";
export const getAndSetAmadeusToken = async () => {
  try {
    const response = await axios.post(
      `https://test.api.amadeus.com/v1/security/oauth2/token`,
      {
        client_id: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
        client_secret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET,
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data?.access_token;
    Cookies.set("Amadeus_token", data);
    return data;
  } catch (error) {}
};
