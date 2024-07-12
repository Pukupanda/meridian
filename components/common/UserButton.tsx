import { useGetCurrentUser } from "@/hooks/react-query/auth/get-current-user";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  const { data, isFetching } = useGetCurrentUser();
  return (
    <Link href="/profile" className="text-white cursor-pointer">
      {!isFetching && <h1>{data?.data?.name}</h1>}
    </Link>
  );
};

export default UserInfo;
