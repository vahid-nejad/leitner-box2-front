import React from "react";
import {
  DocumentAddIcon,
  HomeIcon,
  ChartBarIcon,
} from "@heroicons/react/solid";

import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex gap-3 p-2 shadow mb-2 bg-gradient-to-b from-slate-50 to-slate-100">
      <Link passHref href={"/"}>
        <a>
          <div className="mx-2 flex flex-col items-center hover:scale-105 hover:text-fuchsia-500 transition cursor-pointer text-violet-700 ">
            <HomeIcon className="w-5 " />
            <span className="capitalize ">Home</span>
          </div>
        </a>
      </Link>
      <Link passHref href={"/add"}>
        <a>
          <div className="mx-2 flex flex-col items-center hover:scale-105 hover:text-fuchsia-500 transition cursor-pointer text-violet-700 ">
            <DocumentAddIcon className="w-5 " />
            <span className="capitalize ">add new card</span>
          </div>
        </a>
      </Link>
      <Link passHref href={"/stat"}>
        <a>
          <div className="mx-2 flex flex-col items-center hover:scale-105 hover:text-fuchsia-500 transition cursor-pointer text-violet-700 ">
            <ChartBarIcon className="w-5 " />
            <span className="capitalize ">Statistics</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default NavBar;
