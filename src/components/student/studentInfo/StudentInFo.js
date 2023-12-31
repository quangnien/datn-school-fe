import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Body from "./Body";
import React from "react";
import {
  getAllUnitStudent,
  getStudentByIdStudent,
} from "../../../redux/actions/studentActions";
import Sidebar from "../../admin/Sidebar";
import Header from "../../admin/Header";

const StudentInFo = () => {
  const store = useSelector((state) => state);
  const idLogin = store.auth.userData.retObj.userDetails?.idLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentByIdStudent(idLogin));
    dispatch(getAllUnitStudent(idLogin));
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

export default StudentInFo;
