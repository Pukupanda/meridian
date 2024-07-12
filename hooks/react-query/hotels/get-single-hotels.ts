"use client";

import {
  getFeatureHotels,
  getSingleHotels,
} from "@/common/api/hotels/hotels.api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleHotel = (id: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-single-hotel"],
    queryFn: () => getSingleHotels(id),
  });
  return {
    data,
    isFetching,
    isLoading,
    refetch,
  };
};
