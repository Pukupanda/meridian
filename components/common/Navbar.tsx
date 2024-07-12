"use client";
import React, { useState } from "react";
import logo from "@/public/logo.svg";
import Footerlogo from "@/public/FooterLogo.svg";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavbarRoutes from "./NavRoutes";
import { Menu } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { isUserAuthenticated } from "@/common/api";
import UserInfo from "./UserButton";

const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <nav className="bg-[#2e386a] flex justify-between items-center px-10 py-2">
      <div>
        {!isUserAuthenticated() ? (
          <Link href="/login" className="flex items-center gap-2 text-white">
            <FaRegUser />
            Signup/ Login
          </Link>
        ) : (
          <UserInfo />
        )}
      </div>
      <div>
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-[135px] " />
        </Link>
      </div>
      <div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className=" hover:opacity-75 transition">
            <Menu size={50} color="white" />
          </SheetTrigger>
          <SheetContent side={"right"} className="p-0 w-[260px] bg-white">
            <div className="flex justify-center items-center">
              <Image alt="Logo" src={Footerlogo} className="mt-10 " />
            </div>
            <ScrollArea className="h-[100vh] pb-24">
              <NavbarRoutes setSheetOpen={setSheetOpen} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
