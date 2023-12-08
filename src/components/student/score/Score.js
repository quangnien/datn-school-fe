import React, { useEffect } from "react";
import Body from "./Body";
// import Sidebar from "../../student/Sidebar";
import Header from "../../student/Header";
import { useDispatch } from "react-redux";
import {
  getAllKHNStudent,
  getScoreStudent0Student,
  getScoreStudent1Student,
} from "../../../redux/actions/studentActions";
import Sidebar from "../../admin/Sidebar";

const Score = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllKHNStudent());
    dispatch(getScoreStudent1Student(user?.retObj?.userDetails?.username));
    dispatch(getScoreStudent0Student(user?.retObj?.userDetails?.username));
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

export default Score;
