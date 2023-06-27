import React from "react";

import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <AiIcons.AiFillHome />
      </IconContext.Provider>
    ),
    
    cName: "nav-text"
  },
  {
    title: "History",
    path: "/user/history",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoIosPaper />
      </IconContext.Provider>
    ),
   
    cName: "nav-text"
  },
  {
    title: "Wishlist",
    path: "/user/wishlist",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
        <IoIcons.IoMdHeart />
      </IconContext.Provider>
    ),
    
    cName: "nav-text"
  },
  {
    title: "Password",
    path: "/user/password",
    icon: (
      <IconContext.Provider value={{ color: "#045e7c" }}>
       <IoIcons.IoMdFingerPrint />
      </IconContext.Provider>
    ),
  
    cName: "nav-text"
  }
];