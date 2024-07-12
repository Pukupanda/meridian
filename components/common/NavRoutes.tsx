"use client";
import React from "react";
import {
  Compass,
  Users,
  Component,
  CircleHelp,
  BadgeEuro,
  MessageCircleX,
  Link,
  Scale,
  ListOrdered,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { MdCategory, MdDashboard } from "react-icons/md";
import { SiMicrosoftstore } from "react-icons/si";
import NavItem from "./NavItem";
type Props = {
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavbarRoutes({ setSheetOpen }: Props) {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Offers",
      href: "/offers",
    },
    {
      label: "Hotels",
      href: "/hotels",
    },
    {
      label: "Accommodation",
      href: "/accomodation",
    },
    {
      label: "Execursions",
      href: "/execursions",
    },
    {
      label: "Profile",
      href: "/profile",
    },

    {
      label: "My Reservations",
      href: "/my-reservations",
    },
    {
      label: "Help Center",
      href: "/help-center",
    },
    {
      label: "Terms Of Participation",
      href: "/terms",
    },

    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Contact Info",
      href: "/contact",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ] as const;
  return (
    <div className="flex flex-col w-full pb-24  mt-5 ">
      {routes?.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          href={route.href}
          setSheetOpen={setSheetOpen}
        />
      ))}
    </div>
  );
}

export default NavbarRoutes;
