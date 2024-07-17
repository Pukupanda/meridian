import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

import logo from "@/public/FooterLogo.svg";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-[#f6f6f6] shadow-md rounded-md grid grid-cols-1 md:grid-cols-3 place-content-center  py-5 px-5">
      {/* section 1 */}
      <div className="flex justify-center md:block mt-10">
        <Image src={logo} alt="Logo" />
      </div>
      {/*todo: section 2 */}
      <div className="flex items-center justify-center flex-col gap-y-3 mt-10 md:mt-32">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[#2d3769] text-xl  mb-2 font-semibold">
            Contact
          </h1>
          <Link href="/contact" className="text-[#8d8d8d]">
            contact info
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col my-1">
          <h1 className="text-[#2d3769] text-xl mt-5  mb-1 font-semibold gap-y-3">
            GENERAL INFORMATION
          </h1>
          <Link href="/terms" className="text-[#8d8d8d]">
            Terms of participation
          </Link>
          <Link href="/privacy-policy" className="text-[#8d8d8d]">
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[#2d3769] text-xl mt-5 font-semibold">AID</h1>
          <Link href="/help-center" className="text-[#8d8d8d]">
            Help center
          </Link>
          <h2 className="text-[#8d8d8d]">FAQs</h2>
        </div>
        <div className="flex items-center justify-center gap-4 mt-5">
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            className="social-icon-link"
          >
            <div className="social-icon-circle">
              <FaFacebook size={30} />
            </div>
          </Link>
          <Link
            href="https://tiktok.com/"
            target="_blank"
            className="social-icon-link"
          >
            <div className="social-icon-circle">
              <FaTiktok size={30} />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="social-icon-link"
          >
            <div className="social-icon-circle">
              <IoLogoInstagram size={30} />
            </div>
          </Link>
        </div>
      </div>

      {/* section 3 */}
      <div>
        <h1 className="text-[#2e386a] ms-0 md:ms-10 text-[25px] md:text-right mt-10 text-center font-bold pr-4">
          Your trusted travel guide
          <br />
          online consultant
        </h1>
      </div>
    </div>
  );
};

export default Footer;
