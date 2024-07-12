"use client";
import { useGetCurrentUser } from "@/hooks/react-query/auth/get-current-user";
import React from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
  const { data, isFetching, isLoading } = useGetCurrentUser();
  return (
    <div>
      {!isLoading && !isFetching && (
        <EditProfileForm userDetails={data?.data} />
      )}
    </div>
  );
};

export default EditProfile;
