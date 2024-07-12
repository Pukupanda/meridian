import { NextResponse } from "next/server";
import Amadeus from "amadeus";
import axios from "axios";
import Cookies from "js-cookie";
import { getAndSetAmadeusToken } from "@/helpers/generate-token/amadeus.token";
const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET,
});
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("Amadeus_token")}`,
  },
};

export async function GET(req) {
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=DX&ratings=5`,
      {
        headers: config.headers,
      }
    );
    const data = response.data;
    return NextResponse.json({ data: data?.data.slice(0, 10) });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const token = await getAndSetAmadeusToken();
      const response = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=DXB&ratings=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      return NextResponse.json({ data: data?.data.slice(0, 10) });
    }
  }
}
