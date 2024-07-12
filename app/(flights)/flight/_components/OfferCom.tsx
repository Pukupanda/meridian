"use client";
import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useGetDestinationCity } from "@/hooks/react-query/city/get-city-destination";
import { useGetSearchFlights } from "@/hooks/react-query/flight/get-searched-flight";
import FlightCard from "@/components/cards/FlightCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import EmptyState from "@/components/NotFound";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FlightOffers = () => {
  const DEFAULT_CUSTOM_PRICE = [0, 1000] as [number, number];
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const where = searchParams.get("where");
  const adult = searchParams.get("adult");
  const child = searchParams.get("child");
  const departureDate = searchParams.get("departureDate");
  const price = searchParams.get("price");
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();
  const [notFound, setnotFound] = useState(false);
  const [results, setresults] = useState([]);
  const [showSugg, setshowSugg] = useState({
    source: false,
    destination: false,
  });
  const [searchText, setsearchText] = useState("par");
  const [filter, setfilter] = useState<{
    from: string;
    where: string;
    price: [number, number];
    adult: number;
    child: null | number;
    departureDate: string;
  }>({
    from: "",
    where: "",
    price: DEFAULT_CUSTOM_PRICE,
    adult: 0,
    child: 0,
    departureDate: "",
  });

  const handleSetQuery = () => {
    params.set("from", filter.from);
    params.set("where", filter.where);
    params.set("departureDate", filter.departureDate);
    params.set("adult", filter.adult.toString());
    params.set("price", filter.price[1].toString());
    if (filter.child) {
      params.set("child", filter.child.toString());
    } else {
      params.delete("child");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const { data, isFetching, isLoading, refetch } =
    useGetDestinationCity(searchText);
  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  const handleSubmit = async () => {
    if (
      !(filter?.where?.length >= 3) &&
      !(filter.from?.length >= 3) &&
      filter?.adult === 0
    ) {
      toast.error("Fill the filter field");
    } else {
      handleSetQuery();
    }
  };

  const apidata = {
    from,
    where,
    adult,
    child: child ? child : "0",
    departureDate,
    price: price,
  };

  console.log(apidata);
  const {
    data: searchedResult,
    isFetching: searchedResultFetching,
    isLoading: searchedResultLoading,
    refetch: searchedResultResultFetchingRefetch,
  } = useGetSearchFlights(apidata);

  return (
    <>
      {!searchedResultFetching && !searchedResultLoading && (
        <div className=" mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
          <h3 className="text-[#2d3769] text-3xl text-center font-medium my-10 ">
            Offers
          </h3>
          {/* filters */}
          <div className="flex justify-center">
            <div className=" p-3 py-5 w-[1000px] pr-10 rounded-md bg-[#bae1d6]">
              <div>
                {/* first row */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <h3 className="text-[#2d3769] text-xl font-bold mb-2 ms-5">
                      From
                    </h3>
                    <div className="flex flex-col items-center justify-center">
                      <Input
                        className="rounded-full"
                        placeholder="Start Search"
                        value={filter.from}
                        onFocus={() =>
                          setshowSugg({ ...showSugg, source: true })
                        }
                        onChange={(e) => {
                          setfilter({ ...filter, from: e.target.value });
                          if (e.target.value?.length >= 3) {
                            setsearchText(e.target.value);
                            _debounceSubmit();
                          }
                        }}
                      />
                      {showSugg.source && !isLoading && !isFetching && (
                        <ScrollArea className="h-[200px]  rounded-md border w-full p-4 bg-white">
                          {data?.data?.data &&
                            data?.data?.data.map((el: any) => (
                              <h4
                                className="block my-3 text-center"
                                key={el.name}
                                onClick={() => {
                                  setfilter({
                                    ...filter,
                                    from: el?.iataCode,
                                  });
                                  setshowSugg({ ...showSugg, source: false });
                                }}
                              >
                                {el.name}({el?.iataCode})
                              </h4>
                            ))}
                        </ScrollArea>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#2d3769] text-xl font-bold mb-2 ms-5">
                      Where
                    </h3>
                    <div className="flex flex-col items-center justify-center">
                      <Input
                        placeholder="Destination Search"
                        onFocus={() =>
                          setshowSugg({ ...showSugg, destination: true })
                        }
                        className="rounded-full"
                        value={filter.where}
                        onChange={(e) => {
                          setfilter({ ...filter, where: e.target.value });
                          if (e.target.value?.length >= 3) {
                            _debounceSubmit();
                            setsearchText(e.target.value);
                          }
                        }}
                      />
                      {showSugg.destination && !isLoading && (
                        <ScrollArea className="h-[200px]  rounded-md border p-4 bg-white">
                          <div className="grid grid-cols-1">
                            {data?.data?.data &&
                              data?.data?.data?.map((el: any) => (
                                <button
                                  className="bock my-3"
                                  key={el.name}
                                  onClick={() => {
                                    setfilter({
                                      ...filter,
                                      where: el?.iataCode,
                                    });
                                    setshowSugg({
                                      ...showSugg,
                                      destination: false,
                                    });
                                  }}
                                >
                                  {el.name}({el?.iataCode})
                                </button>
                              ))}
                          </div>
                        </ScrollArea>
                      )}
                    </div>
                  </div>
                </div>
                {/* seccond row */}
                <div className="flex gap-2 items-center mt-5">
                  <div className="w-full">
                    <h3 className="text-[#2d3769] text-xl font-bold mb-2 ms-5">
                      No Of Adult Pessenger
                    </h3>
                    <Select
                      onValueChange={(val) =>
                        setfilter({ ...filter, adult: +val! })
                      }
                    >
                      <SelectTrigger className="w-full rounded-full">
                        <SelectValue placeholder="No Of Adult Passenger" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.from({ length: 30 }, (_, index) => (
                          <SelectItem
                            key={index + 1}
                            value={(index + 1).toString()}
                          >
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <h3 className="text-[#2d3769] text-xl font-bold mb-2 ms-5">
                      No Of Child Pessenger
                    </h3>

                    <Select
                      onValueChange={(val) =>
                        setfilter({ ...filter, child: +val! })
                      }
                    >
                      <SelectTrigger className="w-full rounded-full">
                        <SelectValue
                          placeholder="No Of Child Passenger"
                          className="w-full"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.from({ length: 30 }, (_, index) => (
                          <SelectItem
                            key={index + 1}
                            value={(index + 1).toString()}
                          >
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* last  row */}

                <div className="mt-5 grid grid-cols-2 place-content-center">
                  <div>
                    <h3 className="text-[#2d3769] text-xl font-bold mb-2 ms-5">
                      Departure Date
                    </h3>
                    <Input
                      type="date"
                      className="rounded-full text-center "
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        setfilter({ ...filter, departureDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className=" bg-white rounded-[20px] mt-10">
                  <div className=" flex gap-2  px-5 items-center pt-5 ">
                    <h3 className="text-[#2d3769] text-xl font-bold mb-2 ">
                      Price
                    </h3>
                    <Slider
                      onValueChange={(range) => {
                        const [min, max] = range;
                        setfilter((prev) => ({
                          ...prev,
                          price: [DEFAULT_CUSTOM_PRICE[0], max],
                        }));
                      }}
                      value={filter.price}
                      min={DEFAULT_CUSTOM_PRICE[0]}
                      defaultValue={DEFAULT_CUSTOM_PRICE}
                      max={DEFAULT_CUSTOM_PRICE[1]}
                      step={1}
                    />
                  </div>
                  <div className="flex justify-between pb-3 ">
                    <h3 className="text-[#2d3769] ms-24 bg-[#bae1d6] px-2 py-1/2 rounded-sm  text-sm font-bold mb-2">
                      from {filter.price[0]}{" "}
                    </h3>
                    <h3 className="text-[#2d3769] text-sm font-bold mb-2 mr-12 bg-[#bae1d6] px-2 py-1/2">
                      upto {filter.price[1]}{" "}
                    </h3>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <Button
                    variant={"outline"}
                    className="bg-[#2d3769] text-white w-[200px]"
                    onClick={() => handleSubmit()}
                  >
                    {" "}
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* lists */}

          <div className="">
            <h3 className="text-[#2d3769] text-3xl text-center font-medium my-20 ">
              Flight Offers
            </h3>

            {searchedResult?.data &&
            !searchedResultLoading &&
            !searchedResultFetching ? (
              <div className="grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {searchedResult?.data?.map((item: any, index: number) => (
                  <FlightCard data={item} key={index} paramsdata={apidata} />
                ))}
              </div>
            ) : (
              <div>
                {notFound ? (
                  <EmptyState />
                ) : (
                  <div className="flex justify-center w-full">
                    <h3 className="text-[#2d3769] text-xl text-center font-medium my-10 flex gap-2 items-center">
                      <Search />
                      Search Above TO find your dream flight
                    </h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="w-full">
        {!searchedResultFetching &&
          !searchedResultLoading &&
          searchedResult?.data?.length <= 0 && <EmptyState />}
      </div>
      <div className="flex justify-center items-center h-screen">
        {searchedResultFetching && searchedResultLoading && (
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        )}
      </div>
    </>
  );
};

export default FlightOffers;
