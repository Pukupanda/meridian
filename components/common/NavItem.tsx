"use client";
import { isUserAuthenticated, LogoutUser } from "@/common/api";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { IconType } from "react-icons";
type Props = {
  label: string;
  href: string;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavItem: React.FC<Props> = ({ href, label, setSheetOpen }) => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive = pathName === href || pathName?.startsWith(`${href}/`);

  const onClick = () => {
    if (label === "Logout") {
      LogoutUser();
    } else {
      router.push(href);
    }
    setSheetOpen(false);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex  items-center gap-x-2 text-slat e-500 text-[16px]  font-[500] pl-6 transition-all hover:text-slate-500 hover:bg-slate-300/20 mt-4",
        isActive && "bg-slate-200",
        label === "Profile" && !isUserAuthenticated() && "hidden",
        label === "Logout" && !isUserAuthenticated() && "hidden"
      )}
    >
      <span className="flex items-center gap-x-2 py-2">{label}</span>
      <span
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default NavItem;
