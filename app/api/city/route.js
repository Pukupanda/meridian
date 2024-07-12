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
    const keyword = searchParams.get("keyword");
    if (!keyword) {
      return NextResponse.json(
        { message: "Please provide the keyword as query", success: false },
        { status: 400 }
      );
    } else {
      const cities = await amadeus.referenceData.locations.cities.get({
        keyword: `${keyword}`,
      });
      return NextResponse.json(
        { data: JSON.parse(cities?.body), success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error, "wow");
    return NextResponse.json(
      { message: "Internal Server error", success: false },
      { status: 500 }
    );
  }
}
