"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import bannerImage from "@/public/Banner.svg";
import { ArrowRight, ChevronRight } from "lucide-react";
import FilterBar from "@/components/Filter";
import OfferCard from "@/components/cards/OfferCard";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="relative">
        <Image src={bannerImage} alt="Banner" />
        <div className="absolute top-[50%] left-[50%] bg-[#2e386a] flex items-center flex-col px-1 md:px-3 py-2 rounded-md shadow-sm translate-x-[-50%] translate-y-[-50%] bg-opacity-70 gap-y-2 ">
          <h1 className="text-white uppercase text-2xl md:text-4xl font-bold">
            Dubai
          </h1>
          <p className="flex items-center gap-2 text-sm font-medium ms-3 text-[#00ff94]">
            See All Packages <ArrowRight />{" "}
          </p>
        </div>
      </div>

      <div>
        <FilterBar />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
        <div className="mb-10">
          <h3 className="text-[#2d3769] text-3xl text-center font-bold ">
            Daily Deals
          </h3>
          <p className="text-[#938e8e] text-center text-sm mt-3">
            Discover Daily Deals
          </p>
          <p className="text-[#938e8e] text-center text-sm">
            offers for dream trips!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2   px-10 md:px-0 md:grid-cols-3 2xl:grid-cols-4 gap-3 gap-y-5 place-content-center">
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
        </div>

        <div className="flex justify-center">
          <button
            className="flex gap-1 items-center justify-center bg-[#2d3769] w-[250px] text-xl text-white  rounded-full py-1 mt-10"
            onClick={() => router.push("/offers")}
          >
            See all offers <ChevronRight />{" "}
          </button>
        </div>
        {/* final footer type container  */}
        <div className="my-32">
          <h3 className="text-[#2d3769] text-3xl text-center font-bold ">
            Subscribe to NewsLetter
          </h3>
          <div className="flex flex-col justify-center items-center">
            <p className="w-full max-w-lg mt-5 text-[#938e8e] text-center mx-auto px-4 sm:px-6 lg:px-8">
              Subscribe to the Newsletter now, be the first to know about the
              hottest destinations
            </p>

            <div className="relative mt-5">
              <Input
                className="rounded-full bg-[#e2e2e2] w-[310px] md:w-[600px] md:h-[50px] h-[40px] text-sm"
                placeholder="you@gmail.com"
              />
              <button className="flex gap-1 items-center justify-center bg-[#2d3769] h-[40px] md:h-[50px] w-[120px] text-xl text-white  rounded-full  absolute top-0 right-0">
                Sign up
              </button>
              <div className="flex justify-center items-center gap-2 mt-5">
                <input type="checkbox" /> I agree to terms of use
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
