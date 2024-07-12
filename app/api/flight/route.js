import { NextResponse } from "next/server";
import Amadeus from "amadeus";
import { AArrowDown } from "lucide-react";
const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET,
});

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const from = searchParams.get("from");
    const where = searchParams.get("where");
    const adult = searchParams.get("adult");
    const child = searchParams.get("child");
    const departureDate = searchParams.get("departureDate");
    const price = searchParams.get("price");
    const result = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: from,
      destinationLocationCode: where,
      departureDate: departureDate,
      adults: adult ? adult : 0,
      children: child ? child : 0,
      currencyCode: "USD",
      maxPrice: price,
    });
    return NextResponse.json(
      { data: result.data, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server error", success: false },
      { status: 500 }
    );
  }
}

// const result = await amadeus.shopping.flightOffersSearch.get({
//   originLocationCode: "SYD",
//   destinationLocationCode: "BKK",
//   departureDate: "2024-08-01",
//   adults: "2",
// maxPrice: 300,
//   mPrice: 300,
//   currencyCode: "USD",
// });