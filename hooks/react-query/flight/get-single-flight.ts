"use client";
import { getSingleFlight } from "@/common/api/flight/flight.api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleFlight = (body: any) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["single-flight"],
    queryFn: () => getSingleFlight(body),
  });
  return { data, isFetching, isLoading, refetch };
};
