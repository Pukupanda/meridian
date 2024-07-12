import React from "react";
import cardImage from "@/public/cardImg.svg";
import Image from "next/image";
const OfferCard = () => {
  return (
    <div>
      <div className="dealCard ">
        <Image src={cardImage} alt="" className="cardImg" />
        <div className="py-2 rounded-b-[1rem] bg-[#e26986]">
          <h6 className="text-white font-semibold text-[18px] text-center ">
            Rome
          </h6>
          <h6 className="text-white font-semibold text-[18px] text-center ">
            {" "}
            from €179
          </h6>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
