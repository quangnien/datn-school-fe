import { useDispatch } from "react-redux";
import Body from "./Body";
import Header from "./Header";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  getAllCourse,
  getAllDepartment,
  getAllStudent,
  getAllSubject,
  getAllTeacher,
  getAllUnit,
  getCurrentUser,
} from "../../redux/actions/adminActions";
import { getAllUnitStudent } from "../../redux/actions/studentActions";

const AdminHome = () => {
  const store = useSelector((state) => state);
  const idLogin = store.auth.userData.retObj.userDetails?.idLogin;

  var value = {
    page: "0",
    size: "1000",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllUnit());
    dispatch(getStudentById(idLogin));
    dispatch(getAllUnitStudent(idLogin));
    dispatch(
      getAllTeacher({
        params: {
          ...value,
        },
      })
    );
    dispatch(getCurrentUser());
    dispatch(getAllDepartment());
    dispatch(getAllCourse());
    dispatch(getAllSubject());
  }, [dispatch]);

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center">
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
export default AdminHome;
