import React from "react";
import dynamic from "next/dynamic";
const FlightOffers = dynamic(() => import("./_components/OfferCom"), {
  ssr: false,
});

const FlightPage = () => {
  return (
    <div>
      <FlightOffers />
    </div>
  );
};

export default FlightPage;
