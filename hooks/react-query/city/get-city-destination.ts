"use client";
import { getAllCities } from "@/common/api/city/city.api";
import { useQuery } from "@tanstack/react-query";

export const useGetDestinationCity = (keyword: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["destination-city"],
    queryFn: () => getAllCities(keyword),
  });
  return { data, isFetching, isLoading, refetch };
};
