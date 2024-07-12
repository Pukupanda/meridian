"use client";
import axios from "axios";
import React from "react";
import OfferDetails from "./_components/OfferDetails";
import { useSearchParams } from "next/navigation";
import { useGetSingleFlight } from "@/hooks/react-query/flight/get-single-flight";
import FlightDetails from "./_components/OfferDetails";
import EmptyState from "@/components/NotFound";

function SingleOfferPage({ params }: { params: { flightId: number } }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const where = searchParams.get("where");
  const adult = searchParams.get("adult");
  const child = searchParams.get("child");
  const departureDate = searchParams.get("departureDate");
  const price = searchParams.get("price");
  const body = {
    from,
    where,
    departureDate,
    price: price,
    adult: adult ? +adult : 0,
    child: child ? +child : 0,
    id: params.flightId,
  };
  console.log(body);
  const { data, isFetching, isLoading } = useGetSingleFlight(body);
  console.log(data);
  return (
    <>
      <div>{!isFetching && !isLoading && <FlightDetails data={data} />}</div>
      <div className="flex justify-center items-center h-screen">
        {isLoading && isFetching && (
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        )}
        {/* done  */}
      </div>
    </>
  );
}
export default SingleOfferPage;
