import React from "react";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IconName from "react-icons/bi";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <AiIcons.AiFillHome />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoIosPaper />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "Product",
    path: "/admin/product",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoIosTv />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoIosToday />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "Category",
    path: "/admin/category",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IconName.BiCategoryAlt />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "Sub Category",
    path: "/admin/sub",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoIosApps />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "coupon",
    path: "/admin/coupon",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoIosGift />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
  {
    title: "password",
    path: "/admin/password",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoMdFingerPrint />
      </IconContext.Provider>
    ),
    cName: "nav-text",
  },
];



