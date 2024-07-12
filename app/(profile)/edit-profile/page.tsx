import React from "react";
import EditProfile from "./_components/EditProfile";
import LoginUserOnly from "@/components/permissions/LoginUserOnly";

const EditProfilePage = () => {
  return (
    <LoginUserOnly>
      <EditProfile />
    </LoginUserOnly>
  );
};

export default EditProfilePage;
