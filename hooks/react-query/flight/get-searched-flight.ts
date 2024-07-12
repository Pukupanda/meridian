"use client";
import { getAllCities } from "@/common/api/city/city.api";
import { getSearchedFlight } from "@/common/api/flight/flight.api";
import { useQuery } from "@tanstack/react-query";

export const useGetSearchFlights = (body: any) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["searched-flights"],
    queryFn: () => getSearchedFlight(body),
    enabled:
      !!body.from &&
      !!body.where &&
      !!body.departureDate &&
      !!body.price &&
      body.adult > 0,
  });
  return { data, isFetching, isLoading, refetch };
};
