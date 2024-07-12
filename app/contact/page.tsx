import React from "react";
import contactusImage from "@/public/contactUsImg.svg";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h3 className="text-[#2d3769] text-3xl text-center font-medium ">
        Contact
      </h3>
      <div>
        <Image src={contactusImage} alt="Contact us" className="mt-10" />
      </div>
      <div className="mt-4">
        <p className="font-semibold text-center mt-5 text-xl mx-3">
          For questions, information and in general issues email to
        </p>
        <p className="font-bold text-2xl text-[#2d3769] text-center my-5 pb-10">
          info@meridiantravel.gr
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
