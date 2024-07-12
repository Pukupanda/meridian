"use client";
import HotelCard from "@/components/cards/Hotel.card";
import HotelCardSkeleton from "@/components/cards/Hotel.card.skeleton";
import { useGetFeaturedHotels } from "@/hooks/react-query/hotels/get-featured-hotels";
import React from "react";

const HotelList = () => {
  const { data, isLoading, isFetching } = useGetFeaturedHotels();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
      <div className="grid grid-cols-1    px-10 md:px-0 md:grid-cols-2 2xl:grid-cols-3 gap-2 gap-y-5 place-content-center">
        {isLoading &&
          isFetching &&
          new Array(10)
            .fill(null)
            .map((el, index) => <HotelCardSkeleton key={index} />)}

        {!isFetching &&
          !isLoading &&
          data &&
          data?.data?.map((hotel: any) => (
            <HotelCard key={hotel?.hotelId} hotel={hotel} />
          ))}
      </div>
    </div>
  );
};

export default HotelList;
