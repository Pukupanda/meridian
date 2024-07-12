"use client";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCurrentUser } from "@/hooks/react-query/auth/get-current-user";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data, isFetching, isLoading } = useGetCurrentUser();
  return (
    <LoginUserOnly>
      <h3 className="text-[#2d3769] text-3xl text-center font-medium my-5 mt-10">
        Account Details
      </h3>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 flex justify-center">
        <Card className="border w-[800px] p-3 py-7 bg-[#bae1d6]">
          <CardContent className="grid grid-cols-8 gap-6">
            <div className="col-span-7">
              <div className="flex justify-between">
                <h3 className="text-[#2d3769] text-xl  font-medium flex flex-col ">
                  <span>Full Name</span>
                  <span>{data?.data?.name}</span>
                </h3>
                <h3 className="text-[#2d3769] text-xl font-medium flex flex-col">
                  <span>Date Of Birth</span>
                  <span>{data?.data?.dob}</span>
                </h3>
                <h3 className="text-[#2d3769] text-xl  font-medium flex flex-col ">
                  <span>Contact Number</span>
                  <span>{data?.data?.phoneNumber}</span>
                </h3>
              </div>
              <h3 className="text-[#2d3769] text-xl  font-medium my-5 ">
                Email: {data?.data?.email}
              </h3>
            </div>
            <div className="col-span-1">
              <button
                className="h-10 w-10 flex items-center justify-center bg-[#2d3769] rounded-md cursor-pointer"
                onClick={() => router.push("/edit-profile")}
              >
                <Pencil color="white" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LoginUserOnly>
  );
};

export default ProfilePage;
