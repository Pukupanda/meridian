import Amadeus from "amadeus";
import { NextResponse } from "next/server";
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

export async function GET(req, { params }) {
  const { hotelId } = params;
  const checkInDate = "2024-07-18";
  const checkOutDate = "2024-07-19";
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&currency=EUR`,
      {
        headers: config.headers,
      }
    );

    const data = response.data;
    return NextResponse.json({ data: data?.data[0] });
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      const token = await getAndSetAmadeusToken();
      console.log(token, "wpw");
      const response = await axios.get(
        `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&currency=EUR`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      return NextResponse.json({ data: data?.data[0] });
    } else {
      return NextResponse.json(
        { message: "Failed to fetch hotel offers - Internal Server Error" },
        { status: 500 }
      );
    }
    console.log(error);
  }
}
