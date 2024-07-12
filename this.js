"use client";
import React, { useEffect, useState } from "react";

type Props = {
  data: any,
};

const FlightDetails: React.FC<Props> = ({ data }) => {
  if (!data || !data.data) {
    return null;
  }

  const {
    price,
    itineraries,
    numberOfBookableSeats,
    travelerPricings,
    lastTicketingDate,
  } = data.data;
  const { departure, arrival, carrierCode, number } =
    itineraries[0].segments[0];

  const [remainingTime, setRemainingTime] = useState < any > null;

  useEffect(() => {
    if (data && data.data && data.data.lastTicketingDate) {
      const lastTicketingDateTime = new Date(
        data.data.lastTicketingDate
      ).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = lastTicketingDateTime - currentTime;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        setRemainingTime({ days, hours, minutes });
      } else {
        setRemainingTime({ days: 0, hours: 0, minutes: 0 });
      }
    }
  }, [data]);

  return (
    <div>
      <div className="bg-[#bae1d6] text-xl p-4">
        <h3 className="text-[#2d3769] text-3xl flex flex-col justify-center items-center font-medium ">
          <span>Only</span>
          <span className="text-xl">
            {data?.data?.price?.currency} {data?.data?.price?.total}
          </span>
        </h3>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-">
        <div className="grid grid-cols-3 gap-10">
          <div className="mx-2 my-16 h-[200px] px-3 col-span-1 bg-[#ededed] shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8 flex  items-center flex-col h-full">
              <div className="font-bold text-xl  text-[#2d3769]">
                Reservation Expires on
              </div>
              <div className="flex  items-center gap-10 h-full mt-3">
                <div className="text-center">
                  <p className="text-[#2d3769] text-4xl font-bold">
                    {remainingTime ? remainingTime.days : "0"}
                  </p>
                  <p className="text-gray-700 text-xl font-bold">Days</p>
                </div>
                <div className="text-center mx-4">
                  <p className="text-[#2d3769] text-4xl font-bold">
                    {remainingTime ? remainingTime.hours : "0"}
                  </p>
                  <p className="text-gray-700  text-xl font-bold">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-[#2d3769] text-4xl font-bold">
                    {remainingTime ? remainingTime.minutes : "0"}
                  </p>
                  <p className="text-gray-700  text-xl font-bold">Minutes</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 my-16 col-span-2 bg-[#bae1d6] shadow-lg rounded-lg overflow-hidden ">
            <p className="font-bold text-xl mb-2 bg-[#2d3769] text-white p-3 text-center">
              Transition
            </p>
            <div className="px-6 py-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl  font-medium ">Departure From</h3>
                  <h3 className="text-[#2d3769] text-3xl font-bold ">
                    {" "}
                    {departure.iataCode}
                  </h3>
                </div>
                <div>
                  <h3 className=" text-xl  font-medium ">Arrived At</h3>
                  <h3 className="text-[#2d3769] text-3xl text-center font-bold ">
                    {" "}
                    {arrival.iataCode}
                  </h3>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                  <h3 className="text-xl  font-medium ">Date & Time</h3>
                  <h3 className="text-[#2d3769] text-xl font-bold ">
                    {" "}
                    {new Date(departure.at).toLocaleString()}
                  </h3>
                </div>
                <div>
                  <h3 className=" text-xl  font-medium ">Date & Time</h3>
                  <h3 className="text-[#2d3769] text-xl text-center font-bold ">
                    {" "}
                    {new Date(arrival.at).toLocaleString()}
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 text-base mt-4">
                <strong>Bookable Seats:</strong> {numberOfBookableSeats}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Details Cards */}

        <div className="border py-3 px-5">
          <h3 className="text-[#2d3769] text-3xl text-center font-medium ">
            Passenger Pricing Info
          </h3>
          <div className="grid grid-cols-3 gap-5 ">
            {travelerPricings.map((traveler: any, index: number) => (
              <div
                key={index}
                className=" mx-2 my-4 bg-[#ededed] shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Traveler {index + 1} Pricing
                  </div>
                  <p className="text-gray-700 text-base">
                    <strong>Traveler Type:</strong> {traveler.travelerType}
                    <br />
                    <strong>Price:</strong> ${traveler.price.total}{" "}
                    {traveler.price.currency}
                  </p>
                  <p className="text-gray-700 text-base mt-4">
                    <strong>Fare Details:</strong>
                  </p>
                  {traveler.fareDetailsBySegment.map(
                    (segment: any, idx: number) => (
                      <div key={idx} className="text-gray-700 text-sm">
                        <p>
                          <strong>Segment {idx + 1}:</strong>
                        </p>
                        <p>
                          <strong>Cabin:</strong> {segment.cabin}
                        </p>
                        <p>
                          <strong>Fare Basis:</strong> {segment.fareBasis}
                        </p>
                        <p>
                          <strong>Class:</strong> {segment.class}
                        </p>
                        <p>
                          <strong>Included Checked Bags:</strong>{" "}
                          {segment.includedCheckedBags.quantity}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
