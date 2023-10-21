import { useDispatch, useSelector } from "react-redux";
import Body from "./Body";
import Header from "./Header";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";

import {
  getTeacherById,
  getAllDepartment,
} from "../../redux/actions/teacherActions";

const TeacherHome = () => {
  const store = useSelector((state) => state);
  const idLogin = store.auth.teacherData.retObj.userDetails?.idLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
    dispatch(getTeacherById(idLogin));
    dispatch(getAllDepartment(idLogin));
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

export default TeacherHome;
