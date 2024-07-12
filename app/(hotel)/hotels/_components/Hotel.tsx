import FilterBar from "@/components/Filter";
import React from "react";
import HotelList from "./Hotel.list";
import HotelMapIcon from "@/public/MAP1.svg";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Hotel = () => {
  return (
    <div>
      <FilterBar />
      <div>
        <h3 className="text-[#2d3769] text-3xl text-center font-bold mt-10">
          Hotels Available
        </h3>
        <p className="text-[#938e8e] text-center text-[18px] font-medium mt-2 mb-10">
          Results 54 of 54 total
        </p>
        <div className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className="flex gap-1 items-center justify-center bg-[#2d3769] w-[200px] text-[18px] text-white  rounded-full py-1 mb-5">
                  <FaMapMarkerAlt className="mr-5" />
                  Hotel Map
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <Image src={HotelMapIcon} alt="Image" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <HotelList />
      </div>
    </div>
  );
};

export default Hotel;
