import Amadeus from "amadeus";
import { NextResponse } from "next/server";
const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET,
});

export async function GET(req, { params }) {
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

    const responsedata = result?.data?.find((da) => da?.id == params.id);

    return NextResponse.json(
      { data: responsedata, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error", success: false },
      { status: 500 }
    );
  }
}
