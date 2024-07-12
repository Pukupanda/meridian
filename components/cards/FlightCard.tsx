"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import OfferImage from "@/public/Offer.svg";
import Image from "next/image";
import { ChevronRight, Euro } from "lucide-react";
type Props = {
  data: any;
  paramsdata: any;
};

const FlightCard: React.FC<Props> = ({ data, paramsdata }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div>
      <Card>
        <CardContent className="p-0 pb-10 rounded-xl">
          <Image className="w-full" src={OfferImage} alt="Image" />
          <div className="px-5">
            <div className="flex justify-between mt-3">
              <h1 className="text-sm text-[#2d3769] font-semibold ">
                Flight Type:{data.type}
              </h1>
              <h1 className="text-sm text-[#2d3769] font-semibold ">
                Available seats:{data?.numberOfBookableSeats}
              </h1>
            </div>
            <h1 className="flex gap-1 text-[#2d3769] font-semibold mt-3">
              Price :{" "}
              <span className="flex text-xl items-center font-bold ">
                {" "}
                <Euro /> {data?.price?.total}
              </span>
            </h1>

            <div className="px-[10%]">
              <button
                className="flex gap-2 items-center justify-center bg-[#2d3769] text-xl text-white  w-full rounded-full py-1 mt-10"
                onClick={() =>
                  router.push(
                    `/flight/${data.id}?from=${paramsdata.from}&where=${paramsdata.where}&adult=${paramsdata.adult}&child=${paramsdata.child}&price=${paramsdata.price}&departureDate=${paramsdata?.departureDate}`
                  )
                }
              >
                View Details <ChevronRight />{" "}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightCard;
