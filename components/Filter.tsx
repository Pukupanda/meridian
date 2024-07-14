"use client";
import React, { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "lodash.debounce";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { Euro, Square } from "lucide-react";
import { getCurrentUser } from "@/common/api/auth/auth.api";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { BiSearchAlt } from "react-icons/bi";
import { useGetDestinationCity } from "@/hooks/react-query/city/get-city-destination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
const FilterBar = () => {
  const [searchText, setsearchText] = useState<string>("");
  const [holders, setholders] = useState({
    from: "",
    to: "",
  });
  const router = useRouter();
  const [showSugg, setshowSugg] = useState({
    source: false,
    destination: false,
  });
  const DEFAULT_CUSTOM_PRICE = [0, 1000] as [number, number];
  const [filter, setfilter] = useState({
    from: "",
    to: "",
    price: DEFAULT_CUSTOM_PRICE,
    adult: 0,
    child: 0,
    departureDate: "",
  });

  const { data, isFetching, isLoading, refetch } = useGetDestinationCity(
    searchText ? searchText : "par"
  );
  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debouncedSubmit, []);

  const submitHandler = () => {
    if (!filter.from || !filter.to || !filter.departureDate) {
      return toast.error("Select the From and To and Departure Date");
    }
    console.log(filter.departureDate);
    if (filter.adult === 0 && filter.child === 0) {
      return toast.error("Select atleast one Passenger");
    }

    router.push(
      `/flight?from=${filter.from}&where=${filter.to}&adult=${
        filter.adult || 0
      }&child=${filter.child || 0}&price=${filter.price[1]}&departureDate=${
        filter?.departureDate
      }`
    );
  };

  return (
    <div className="mt-10 mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
      <div className="flex justify-center">
        <Card className=" p-3 py-5 bg-[#bae1d6] xl:w-[800px] w-full rounded-3xl">
          <CardContent>
            {/* first row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <h3 className="text-[#2d3769] text-[16px] font-bold mb-1">
                  From
                </h3>
                <Input
                  placeholder="Search here..."
                  value={holders.from}
                  className="rounded-full"
                  onFocus={() => setshowSugg({ ...showSugg, source: true })}
                />
                {showSugg.source && (
                  <div className="absolute top-full left-0 w-full bg-[#f3f3f3] text-[#c3c3c3] z-10 rounded-2xl">
                    <Input
                      autoFocus={true}
                      className="outline-none bg-[#dedede] focus-visible:ring-0 rounded-full text-black"
                      placeholder="Search here..."
                      value={searchText}
                      onChange={(e) => {
                        setsearchText(e.target.value);
                        if (e.target.value?.length >= 3) {
                          _debounceSubmit();
                        }
                      }}
                    />
                    <BiSearchAlt className=" absolute top-2 z-20 text-white h-7 w-7 right-8" />
                    <ScrollArea className="h-[200px] rounded-md bg-[#f3f3f3] relative px-4">
                      {!isLoading &&
                        !isFetching &&
                        data?.data?.data &&
                        showSugg.source &&
                        data?.data?.data.map((el: any) => (
                          <h1
                            key={el.iataCode}
                            className="mt-1 text-[16px] text-[#574c4c] cursor-pointer hover:bg-[#cfcfcf] rounded-md py-2 px-1"
                            onClick={() => {
                              setfilter({
                                ...filter,
                                from: el?.iataCode,
                              });
                              setholders({
                                ...holders,
                                from: el.name,
                              });
                              setshowSugg({ ...showSugg, source: false });
                            }}
                          >
                            {el.name}({el?.iataCode})
                          </h1>
                        ))}
                      {isLoading && isFetching && (
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                      )}
                    </ScrollArea>
                  </div>
                )}
              </div>
              <div className="relative">
                <h3 className="text-[#2d3769] text-[16px] font-bold mb-1 ">
                  To
                </h3>
                <Input
                  placeholder="Search here..."
                  value={holders.to}
                  className="rounded-full"
                  onFocus={() =>
                    setshowSugg({ ...showSugg, destination: true })
                  }
                />
                {showSugg.destination && (
                  <div className="absolute top-full left-0 w-full bg-[#f3f3f3] text-[#c3c3c3] z-10 rounded-2xl">
                    <Input
                      autoFocus={true}
                      className="outline-none bg-[#dedede] focus-visible:ring-0 rounded-full text-black"
                      placeholder="Search here..."
                      value={searchText}
                      onChange={(e) => {
                        setsearchText(e.target.value);
                        if (e.target.value?.length >= 3) {
                          _debounceSubmit();
                        }
                      }}
                    />
                    <BiSearchAlt className=" absolute top-2 z-20 text-white h-7 w-7 right-8" />
                    <ScrollArea className="h-[200px] rounded-md bg-[#f3f3f3] relative px-4">
                      {!isLoading &&
                        !isFetching &&
                        data?.data?.data &&
                        showSugg.destination &&
                        data?.data?.data.map((el: any) => (
                          <h1
                            key={el.iataCode}
                            className="mt-1 text-[16px] text-[#574c4c] cursor-pointer hover:bg-[#cfcfcf] rounded-md py-2 px-1"
                            onClick={() => {
                              setfilter({
                                ...filter,
                                to: el?.iataCode,
                              });
                              setholders({
                                ...holders,
                                to: el.name,
                              });
                              setshowSugg({ ...showSugg, destination: false });
                            }}
                          >
                            {el.name}({el?.iataCode})
                          </h1>
                        ))}
                      <div className="flex justify-center items-center">
                        {isLoading && isFetching && (
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </div>
            {/* second row */}
            <div className="mt-4">
              <Button
                className="w-full rounded-full text-[#2d3769] text-[1rem] font-bold flex gap-2 items-center"
                variant={"outline"}
              >
                <Square color="black" />
                Explore Everywhere
              </Button>
            </div>
            {/* third row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <h3 className="text-[#2d3769] text-[16px] font-bold mb-1 ">
                  No Of Adult Pessenger
                </h3>
                <Select
                  onValueChange={(val) =>
                    setfilter({ ...filter, adult: +val! })
                  }
                >
                  <SelectTrigger className="w-full border- rounded-full">
                    <SelectValue placeholder="Choice of overnight stays" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-[#f3f3f3] text-[#c3c3c3]">
                    <ScrollArea className="h-[200px]    rounded-md   bg-[#f3f3f3] relative px-4">
                      {Array.from({ length: 30 }, (_, index) => (
                        <SelectItem
                          key={index + 1}
                          value={(index + 1).toString()}
                        >
                          {index + 1}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-[#2d3769] text-[18px] font-bold mb-1 ">
                  No Of Child Pessenger
                </h3>
                <Select
                  onValueChange={(val) =>
                    setfilter({ ...filter, child: +val! })
                  }
                >
                  <SelectTrigger className="w-full border- rounded-full">
                    <SelectValue placeholder="Choice of overnight stays" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-[#f3f3f3] text-[#c3c3c3]">
                    <ScrollArea className="h-[200px]    rounded-md   bg-[#f3f3f3] relative px-4">
                      {Array.from({ length: 30 }, (_, index) => (
                        <SelectItem
                          key={index + 1}
                          value={(index + 1).toString()}
                        >
                          {index + 1}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/*  */}
            <div className="flex justify-center mt-4">
              <div className="md:w-[50%] w-full">
                <h3 className="text-[#2d3769]  text-[16px] font-bold mb-1 md:text-center ">
                  Departure month
                </h3>
                <Input
                  type="date"
                  className="rounded-full text-center flex justify-center items-center "
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setfilter({ ...filter, departureDate: e.target.value })
                  }
                />
              </div>
            </div>
            {/* last  row */}

            <div className=" bg-white rounded-[20px] mt-5">
              <div className=" flex gap-2   px-5  items-center pt-5 ">
                <h3 className="text-[#2d3769] text-[18px]  font-bold mb-2 ">
                  Price
                </h3>
                <Slider
                  onValueChange={(range) => {
                    const [min, max] = range;
                    setfilter((prev) => ({
                      ...prev,
                      price: [min, max],
                    }));
                  }}
                  value={filter.price}
                  min={DEFAULT_CUSTOM_PRICE[0]}
                  defaultValue={DEFAULT_CUSTOM_PRICE}
                  max={DEFAULT_CUSTOM_PRICE[1]}
                  step={5}
                />
              </div>
              <div className="flex justify-between pb-3 mt-2 md:mt-0 ">
                <h3 className="text-[#2d3769] ms-24 bg-[#bae1d6] px-2 py-1/2 rounded-sm  text-sm font-bold mb-2 flex items-center gap-1/2">
                  from <Euro className="h-4 w-4" /> {filter.price[0]}{" "}
                </h3>
                <h3 className="text-[#2d3769] text-sm font-bold mb-2 mr-12 bg-[#bae1d6] px-2 py-1/2 flex items-center gap-1/2">
                  upto <Euro className="h-4 w-4" /> {filter.price[1]}{" "}
                </h3>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="flex gap-1 items-center justify-center bg-[#2d3769] w-[220px] text-[18px] text-white  rounded-full py-1 mt-5"
                onClick={() => submitHandler()}
              >
                <BiSearchAlt className="h-6 w-6" />
                Search
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilterBar;
