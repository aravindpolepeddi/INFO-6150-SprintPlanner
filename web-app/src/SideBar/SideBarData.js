import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as VscIcons from "react-icons/vsc";

//menu items of sideBar
export const SidebarData = [
  {
    title: "List",
    path: "/tasks",
    icon: <AiIcons.AiOutlineUnorderedList />,
    cName: "nav-text",
  },  
  {
    title: "Board",
    path: "/board",
    icon: <HiIcons.HiOutlineViewBoards />,
    cName: "nav-text",
  },
  {
    title: "Project",
    path: "/project",
    icon: <FaIcons.FaLaravel />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <VscIcons.VscGraphLine />,
    cName: "nav-text",
  },
];
