"use client";
import React, { useState } from "react";
import FilterImage from "@/public/Filter_big.svg";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BiSearchAlt } from "react-icons/bi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import HotelCard from "@/components/cards/Hotel.card";
const OfferPage = () => {
  const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];
  const [filter, setfilter] = useState({
    from: "",
    where: "",
    overnightStays: "",
    price: DEFAULT_CUSTOM_PRICE,
  });
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
      <div className="flex justify-center flex-col items-center mt-10">
        <h3 className="text-[#2d3769] text-3xl  font-bold ">Offers</h3>

        <div className="w-full flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className="flex gap-1 items-center justify-center bg-[#2d3769] w-[220px] text-[18px] text-white  rounded-full py-1 mt-10">
                  <Image src={FilterImage} alt="Image" />
                  Show Filters
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="p-5 md:p-20">
                {/* first row */}
                <Card className="rounded-t-[40px] rounded-b-[40px]">
                  <CardContent className="xl:w-[800px] md:w-[100vw] bg-[#bae1d6] rounded-t-[40px] rounded-b-[40px] px-5 py-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <h3 className="text-[#2d3769] text-[18px] font-bold mb-2">
                          From
                        </h3>
                        <Select>
                          <SelectTrigger className="w-full border-2  rounded-full">
                            <SelectValue placeholder="Start Search" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-[#f3f3f3] text-[#c3c3c3]">
                            <ScrollArea className="h-[200px]    rounded-md   bg-[#f3f3f3] relative px-4">
                              <Input
                                className="outline-none bg-[#dedede] focus-visible:ring-0 rounded-full text-black"
                                placeholder="Search here..."
                              />
                              <BiSearchAlt className=" text-white absolute top-2 h-7 w-7 right-8" />
                              <SelectItem
                                value="light"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Light
                              </SelectItem>
                              <SelectItem
                                value="Blue"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Blue
                              </SelectItem>
                              <SelectItem
                                value="Green"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Green
                              </SelectItem>
                              <SelectItem
                                value="Purple"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Purple
                              </SelectItem>
                              <SelectItem
                                value="Yellow"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Yellow
                              </SelectItem>
                              <SelectItem
                                value="gray"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                gray
                              </SelectItem>
                              <SelectItem
                                value="dark"
                                className="text-[16px] text-[#574c4c]"
                              >
                                Dark
                              </SelectItem>
                              <SelectItem
                                className="text-[16px] text-[#574c4c]"
                                value="system"
                              >
                                System
                              </SelectItem>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="text-[#2d3769] text-[18px] font-bold mb-2 ">
                          To
                        </h3>
                        <Select>
                          <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Destination Search" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-[#f3f3f3] text-[#c3c3c3]">
                            <ScrollArea className="h-[200px]    rounded-md   bg-[#f3f3f3] relative px-4">
                              <Input
                                className="outline-none bg-[#dedede] focus-visible:ring-0 rounded-full text-black"
                                placeholder="Search here..."
                              />
                              <BiSearchAlt className=" text-white absolute top-2 h-7 w-7 right-8" />
                              <SelectItem
                                value="light"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Light
                              </SelectItem>
                              <SelectItem
                                value="Blue"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Blue
                              </SelectItem>
                              <SelectItem
                                value="Green"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Green
                              </SelectItem>
                              <SelectItem
                                value="Purple"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Purple
                              </SelectItem>
                              <SelectItem
                                value="Yellow"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Yellow
                              </SelectItem>
                              <SelectItem
                                value="gray"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                gray
                              </SelectItem>
                              <SelectItem
                                value="dark"
                                className="text-[16px] text-[#574c4c]"
                              >
                                Dark
                              </SelectItem>
                              <SelectItem
                                className="text-[16px] text-[#574c4c]"
                                value="system"
                              >
                                System
                              </SelectItem>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* second row */}
                    <div className="mt-5">
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
                        <h3 className="text-[#2d3769] text-[18px] font-bold mb-2 ">
                          Overnight Stays
                        </h3>
                        <Select>
                          <SelectTrigger className="w-full border- rounded-full">
                            <SelectValue placeholder="Choice of overnight stays" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-[#f3f3f3] text-[#c3c3c3]">
                            <ScrollArea className="h-[200px]    rounded-md   bg-[#f3f3f3] relative px-4">
                              <Input
                                className="outline-none bg-[#dedede] focus-visible:ring-0 rounded-full text-black"
                                placeholder="Search here..."
                              />
                              <BiSearchAlt className=" text-white absolute top-2 h-7 w-7 right-8" />
                              <SelectItem
                                value="light"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Light
                              </SelectItem>
                              <SelectItem
                                value="Blue"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Blue
                              </SelectItem>
                              <SelectItem
                                value="Green"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Green
                              </SelectItem>
                              <SelectItem
                                value="Purple"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Purple
                              </SelectItem>
                              <SelectItem
                                value="Yellow"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Yellow
                              </SelectItem>
                              <SelectItem
                                value="gray"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                gray
                              </SelectItem>
                              <SelectItem
                                value="dark"
                                className="text-[16px] text-[#574c4c]"
                              >
                                Dark
                              </SelectItem>
                              <SelectItem
                                className="text-[16px] text-[#574c4c]"
                                value="system"
                              >
                                System
                              </SelectItem>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="text-[#2d3769]  text-[18px] font-bold mb-2  ">
                          Departure month
                        </h3>
                        <Select>
                          <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-[#f3f3f3] text-[#c3c3c3]">
                            <ScrollArea className="h-[200px]    rounded-md   bg-[#f3f3f3] relative px-4">
                              <Input
                                className="outline-none bg-[#dedede] focus-visible:ring-0 rounded-full text-black"
                                placeholder="Search here..."
                              />
                              <BiSearchAlt className=" text-white absolute top-2 h-7 w-7 right-8" />
                              <SelectItem
                                value="light"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Light
                              </SelectItem>
                              <SelectItem
                                value="Blue"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Blue
                              </SelectItem>
                              <SelectItem
                                value="Green"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Green
                              </SelectItem>
                              <SelectItem
                                value="Purple"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Purple
                              </SelectItem>
                              <SelectItem
                                value="Yellow"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                Yellow
                              </SelectItem>
                              <SelectItem
                                value="gray"
                                className="mt-3 text-[16px] text-[#574c4c]   "
                              >
                                gray
                              </SelectItem>
                              <SelectItem
                                value="dark"
                                className="text-[16px] text-[#574c4c]"
                              >
                                Dark
                              </SelectItem>
                              <SelectItem
                                className="text-[16px] text-[#574c4c]"
                                value="system"
                              >
                                System
                              </SelectItem>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* last  row */}

                    <div className=" bg-white rounded-[20px] mt-10">
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
                        <h3 className="text-[#2d3769] ms-24 bg-[#bae1d6] px-2 py-1/2 rounded-sm  text-sm font-bold mb-2">
                          from {filter.price[0]}{" "}
                        </h3>
                        <h3 className="text-[#2d3769] text-sm font-bold mb-2 mr-12 bg-[#bae1d6] px-2 py-1/2">
                          upto {filter.price[1]}{" "}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center">
                  <button className="flex gap-1 items-center justify-center bg-[#2d3769] w-[220px] text-[18px] text-white  rounded-full py-1 mt-5">
                    <BiSearchAlt className="h-6 w-6" />
                    Search
                  </button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10">
        <HotelCard hotel={{ name: "hotel1" }} />
        <HotelCard hotel={{ name: "hotel1" }} />
        <HotelCard hotel={{ name: "hotel1" }} />
        <HotelCard hotel={{ name: "hotel1" }} />
        <HotelCard hotel={{ name: "hotel1" }} />
      </div>
    </div>
  );
};

export default OfferPage;
