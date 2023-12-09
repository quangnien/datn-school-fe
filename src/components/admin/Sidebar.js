import { NavLink } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BarChartIcon from "@mui/icons-material/BarChart";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PTIT from "./ptit.png";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/actions/adminActions";
import { useEffect } from "react";

const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-white hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-1 my-1";
const isActiveStyle =
    "svg: flex items-center px-5 gap-3 text-red font-bold hover:text-black  transition-all duration-200 ease-in-out capitalize hover:bg-gray-200  py-1 my-1";

const Sidebar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);
    const users = useSelector((state) => state.admin.currentUser);

    const users1 = [];
    const users2 = [];
    
    users.forEach(user => {
      const parts = user.split('!!!!!');
      if (parts.length === 2) {
        users1.push(parts[0].trim());
        users2.push(parts[1].trim());
      }
    });

    console.log("users : ", users);
    return (
        <div className="flex-[0.2] w-full h-screen bg-[#04605E]  overflow-scroll overflow-x-hidden">
            <div className="ml-1  pt-2 space-y-4  h-full bg-[#04605E]">
                <div>
                    <img src={PTIT} alt="" className="mr-3 h-[74px] ml-20 " />
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    <NavLink to="/home" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                        <HomeIcon className="" />
                        <h1 className="font-normal">Dashboard</h1>
                    </NavLink>
                </div>

                <div className="mt-0" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_KHOA")] && (
                        <NavLink to="/admin/getdepartmentall" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <AssignmentIndIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_KHOA")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_CHUYENNGANH")] && (
                        <NavLink to="/admin/getchuyennganhall" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <AssignmentIndIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_CHUYENNGANH")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_LOP")] && (
                        <NavLink to="/admin/allUnit" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <SchoolIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_LOP")]}</h1>
                        </NavLink>
                    )}
                    {users1[users1.indexOf("MENU_SINHVIEN")] && (
                        <NavLink to="/admin/student" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <GroupIcon className="" />

                            <h1 className="font-normal">{users2[users1.indexOf("MENU_SINHVIEN")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_GIANGVIEN")] && (
                        <NavLink to="/admin/teacher" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <GroupIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_GIANGVIEN")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_LOPTINCHI")] && (
                        <NavLink to="/admin/allcourse" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <SchoolIcon className="" />

                            <h1 className="font-normal">{users2[users1.indexOf("MENU_LOPTINCHI")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_LICHHOC")] && (
                        <NavLink to="/admin/coursedetail" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <SchoolIcon className="" />

                            <h1 className="font-normal">{users2[users1.indexOf("MENU_LICHHOC")]}</h1>
                        </NavLink>
                    )}
                </div>

                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_DIEM")] && (
                        <NavLink to="/admin/allscore" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <CreditScoreIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_DIEM")]}</h1>
                        </NavLink>
                    )}
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_MONHOC")] && (
                        <NavLink to="/admin/allsubject" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <MenuBookIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_MONHOC")]}</h1>
                        </NavLink>
                    )}
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_MENU")] && (
                        <NavLink to="/admin/getmenuall" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <MenuBookIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_MENU")]}</h1>
                        </NavLink>
                    )}
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_ROLE")] && (
                        <NavLink to="/admin/getroleall" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <MenuBookIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_ROLE")]}</h1>
                        </NavLink>
                    )}
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_USERS")] && (
                        <NavLink to="/admin/getuserall" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <MenuBookIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_USERS")]}</h1>
                        </NavLink>
                    )}
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_CMMNCD")] && (
                        <NavLink to="/admin/getcmmncdall" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <MenuBookIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_CMMNCD")]}</h1>
                        </NavLink>
                    )}
                </div>
                <div className="" style={{ marginTop: 0 }}>
                    {users1[users1.indexOf("MENU_THONGKEDIEM")] && (
                        <NavLink to="/admin/thongke" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <BarChartIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_THONGKEDIEM")]}</h1>
                        </NavLink>
                    )}
                    {users1[users1.indexOf("MENU_GV_DANGKYLICHDAY")] && (
                        <NavLink to="/admin/getgvdow" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <BarChartIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_GV_DANGKYLICHDAY")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_DOIMATKHAU")] && (
                        <NavLink to="/admin/updatepassword" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_DOIMATKHAU")]}</h1>
                        </NavLink>
                    )}

                    {/* sidebar student */}
                    {users1[users1.indexOf("MENU_PROFILE_SV")] && (
                        <NavLink to="/student/studentinfo" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <BarChartIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_PROFILE_SV")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_STUDENT_SCORE")] && (
                        <NavLink to="/student/score" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <BarChartIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_STUDENT_SCORE")]}</h1>
                        </NavLink>
                    )}
                    {users1[users1.indexOf("MENU_STUDENT_TKB")] && (
                        <NavLink to="/student/tkb" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                </svg>
                            </div>
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_STUDENT_TKB")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_STUDENT_DKM")] && (
                        <NavLink to="/student/dangkymon" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                </svg>
                            </div>
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_STUDENT_DKM")]}</h1>
                        </NavLink>
                    )}

                    {/* teacher */}
                    {users1[users1.indexOf("MENU_TEACHER_PROFILE")] && (
                        <NavLink to="/teacher/profile" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                </svg>
                            </div>
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_TEACHER_PROFILE")]}</h1>
                        </NavLink>
                    )}
                    {users1[users1.indexOf("MENU_TEACHER_DIEM")] && (
                        <NavLink to="/teacher/score" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <CreditScoreIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_TEACHER_DIEM")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_TEACHER_TKB")] && (
                        <NavLink to="/teacher/tkb" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                </svg>
                            </div>
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_TEACHER_TKB")]}</h1>
                        </NavLink>
                    )}

                    {users1[users1.indexOf("MENU_TEACHER_THONGKE")] && (
                        <NavLink to="/teacher/thongke" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                            <BarChartIcon className="" />
                            <h1 className="font-normal">{users2[users1.indexOf("MENU_TEACHER_THONGKE")]}</h1>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
