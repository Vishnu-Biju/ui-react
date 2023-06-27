/*  import React, { useState } from "react";


import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SidebarDataAdmin";

// STYLES
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


const UserNav = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      
<IconContext.Provider value={{ color: "#FFF" }}>

<div className="naVbar">
  <Link to="#" className="menu-bars">
    <FaIcons.FaBars onClick={showSidebar} />
  </Link>
</div>
<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
  <ul className="nav-menu-items" onClick={showSidebar}>
    <li className="navbar-toggle">
      <Link to="#" className="menu-bars">
        <AiIcons.AiOutlineClose />
      </Link>
    </li>

    {SidebarData.map((item, index) => {
      return (
        <li key={index} className={item.cName}>
          <Link to={item.path}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </li>
      );
    })}
  </ul>
</nav>
</IconContext.Provider>
</>
  );

}




export default UserNav; 

 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarDataAdmin";
import "./Navbar.css";

const UserNav = () => {
  const [sidebar, setSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <IconContext.Provider value={{ color: "#FFF" }}>
      <div className="navbar">
        {windowWidth < 768 ? (
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            {sidebar ? <FaTimes /> : <FaBars />}
          </Link>
        ) : (
          <NavContent />
        )}
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

const NavContent = () => {
  return (
    <>
      {SidebarData.map((item, index) => {
        return (
          <Link key={index} to={item.path} className="nav-content">
            {item.icon}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </>
  );
};

export default UserNav;
