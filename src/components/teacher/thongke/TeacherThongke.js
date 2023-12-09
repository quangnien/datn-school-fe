import { getAllKHNTeacher } from "../../../redux/actions/teacherActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Body from "./Body";
import React from "react";
import Sidebar from "../../admin/Sidebar";
import Header from "../../admin/Header";

const TeacherThongke = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllKHNTeacher());
  }, [dispatch]);

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

export default TeacherThongke;
