import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

// const Body = () => {
//   const [value, onChange] = useState(new Date());
//   const [valueDate, setValueDate] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => setValueDate(new Date()), 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // timer
//   const getCurrentTime = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();
//     return { hours, minutes, seconds };
//   };
//   const [currentTime, setCurrentTime] = useState(getCurrentTime());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(getCurrentTime());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex-[0.8] mt-3 mx-5">
//       <div className="space-y-5">
//         <div className="flex items-center space-x-2 text-gray-400 ">
//           <HomeIcon />
//           <h1>Dashboard</h1>
//         </div>

//         <div className="grid grid-cols-2 gap-x-10">
//           <div className="grid grid-cols-2 gap-x-4 gap-y-6">
//             chỗ này để dành cho thằng thời khóa biểu nhé
//           </div>

//           <div className="flex flex-col w-full space-y-4">
//             <div className="w-full bg-white shadow-lg rounded-xl">
//               <Calendar onChange={onChange} value={value} />
//             </div>
//             <div className="justify-center ">
//               <div>
//                 Giờ hiện tại là:{" "}
//                 <strong>
//                   {currentTime.hours.toString().padStart(2, "0")}:
//                   {currentTime.minutes.toString().padStart(2, "0")}:
//                   {currentTime.seconds.toString().padStart(2, "0")}
//                 </strong>
//               </div>
//               <Clock value={valueDate} className="mx-auto mt-5 p-28" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Body;

import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";

const Body = () => {
  const students = useSelector((state) => state.student.students?.retObj);
  const units = useSelector((state) => state.admin.allUnit);
  const UnitObj = units?.find((dp) => dp.maLop === students?.maLop);
  const nameUnit = UnitObj?.tenLop;
  // const ngaySinh = new Date(students?.ngaySinh).toLocaleDateString("en-GB");
  const ngaySinh = moment(students?.ngaySinh).format("DD/MM/YYYY");
  return (
    <div className="mx-5 mt-10 item-center ">
      <div className="items-center justify-center space-y-5">
        <div className="w-[1114px] h-[568px] py-8 px-7 text-center justify-center bg-[#E1EEEE] border rounded-md  shadow-md mx-auto flex   gap-x-10">
          <div className="w-[220px] h-[220px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
            <Avatar
              src={students?.hinhAnh}
              style={{ width: 220, height: 220 }}
            />
          </div>
          <div
            className="flex flex-row font-sans gap-x-3 "
            style={{ alignItems: "baseline" }}
          >
            <div
              className="flex flex-col font-sans gap-y-5"
              style={{ width: "130px", textAlign: "left" }}
            >
              <span className="font-sans">Mã sinh viên</span>
              <span className="font-sans">Họ và tên</span>
              <span className="font-sans">Giới tính</span>
              <span className="font-sans">Ngày Sinh</span>
              <span className="font-sans">Nơi sinh</span>
              <span className="font-sans">Địa chỉ</span>
              <span className="font-sans">Số điện thoại</span>
              <span className="font-sans">Email</span>
              <span className="font-sans">Lớp</span>
            </div>
            <div
              className="flex flex-col gap-y-5"
              style={{ width: "250px", textAlign: "left" }}
            >
              <span>{students?.maSv}</span>
              <span>
                {students?.ho} {students?.ten}
              </span>
              <span>{students?.phai}</span>
              <span>{ngaySinh}</span>
              {/* <span>{students?.ngaySinh}</span> */}

              <span>{students?.noiSinh}</span>
              <span>{students?.diaChi}</span>
              <span>{students?.sdt}</span>
              <span>{students?.email}</span>
              <span>{nameUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
