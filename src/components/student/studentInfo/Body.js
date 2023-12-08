import React from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";

const Body = () => {
  const students = useSelector((state) => state.student.students?.retObj);
  const ngaySinh = moment(students?.ngaySinh).format("DD/MM/YYYY");
  return (
    <div className="mx-5 mt-10 item-center ">
      <div className="items-center justify-center space-y-5">
        <div className="w-[1114px] h-[768px] py-8 px-7 text-center justify-center bg-[#E1EEEE] border rounded-md  shadow-md mx-auto flex   gap-x-10">
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
              style={{ width: "160px", textAlign: "left" }}
            >
              <span className="font-sans">Mã sinh viên </span>
              <span className="font-sans">Họ và tên </span>
              <span className="font-sans">Giới tính </span>
              <span className="font-sans">Ngày Sinh </span>
              <span className="font-sans">Nơi sinh </span>
              <span className="font-sans">Địa chỉ </span>
              <span className="font-sans">Số điện thoại </span>
              <span className="font-sans">Email </span>
              <span className="font-sans">Trạng thái </span>
              <span className="font-sans">Mã lớp </span>
              <span className="font-sans">Tên lớp </span>
              <span className="font-sans">Mã khoa </span>
              <span className="font-sans">Tên khoa </span>
              <span className="font-sans">Mã chuyên ngành </span>
              <span className="font-sans">Tên chuyên ngành </span>
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

              <span>{students?.noiSinh}</span>
              <span>{students?.diaChi}</span>
              <span>{students?.sdt}</span>
              <span>{students?.email}</span>

              <span>{students?.tenStatus}</span>
              <span>{students?.maLop}</span>
              <span>{students?.tenLop}</span>
              <span>{students?.maKhoa}</span>
              <span>{students?.tenKhoa}</span>
              <span>{students?.maCn}</span>
              <span>{students?.tenCn}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
