import Body from "./Body";
import React from "react";
import Sidebar from "../../admin/Sidebar";
import Header from "../../admin/Header";

const TeacherUpw = () => {
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center ">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default TeacherUpw;
