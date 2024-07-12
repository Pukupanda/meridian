"use client";

import { getFeatureHotels } from "@/common/api/hotels/hotels.api";
import { useQuery } from "@tanstack/react-query";

export const useGetFeaturedHotels = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryFn: getFeatureHotels,
    queryKey: ["get-featured-hotels"],
  });
  return {
    data,
    isFetching,
    isLoading,
  };
};
