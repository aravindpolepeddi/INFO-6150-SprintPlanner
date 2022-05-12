// Adding the logic for SideBar

import React, { useState } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./SideBar.scss";
import { IconContext } from "react-icons";

function SideBar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#35333b" }}>
        {/* <span className="navbar-side">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          {/* <h3 className="user-welcome">Welcome user !</h3> */}
        {/* </span> */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {/* <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
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



export default SideBar;
