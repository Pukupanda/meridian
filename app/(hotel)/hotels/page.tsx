import React from "react";
import HotelList from "./_components/Hotel.list";
import Hotel from "./_components/Hotel";

const HotelPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <Hotel />
    </div>
  );
};

export default HotelPage;
