import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useEffect } from "react";
import { getTeacherById } from "../../redux/actions/teacherActions";
import Swal from "sweetalert2";
const Header = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "TEACHER_LOGOUT" });
        dispatch({ type: "RESET_TEACHER_AVATAR" });
        navigate("/");
      }
    });
  };

  // const logout = () => {
  //   dispatch({ type: "TEACHER_LOGOUT" });
  //   dispatch({ type: "RESET_TEACHER_AVATAR" });
  //   navigate("/");
  // };
  const idLogin = store.auth.teacherData.retObj.userDetails?.idLogin;

  useEffect(() => {
    dispatch(getTeacherById(idLogin));
  }, [dispatch]);
  const teachers = useSelector((state) => state.teacher.teachers?.retObj);

  return (
    <div className="flex bg-[#FFFFFF] items-center justify-between  h-[74px] w-full">
      <div className="flex items-center">
        <h1 className="ml-5 text-lg font-bold text-red-600">
          {" "}
          Học Viện Công Nghệ Bưu Chính Viễn Thông
        </h1>
      </div>
      <div className="flex items-center mx-5 space-x-3">
        <Avatar src={teachers?.hinhAnh} className="border-2 border-primary" />
        <h1>{store.auth.teacherData?.retObj?.userDetails?.userFullName}</h1>
        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
