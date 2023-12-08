import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import moment from "moment";

const Body = () => {
  const teachers = useSelector((state) => state.teacher.teachers?.retObj);

  const ngaySinh = moment(teachers?.ngaySinh).format("DD/MM/YYYY");

  return (
    <div className="mx-5 mt-10 item-center">
      <div className="w-[1114px] h-[768px] py-8 px-7 text-center justify-center bg-[#E1EEEE] border rounded-md  shadow-md mx-auto flex   gap-x-10">
        <div className="flex mt-10 mb-10 gap-x-16">
          <div className="w-[220px] h-[220px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
            <Avatar
              src={teachers?.hinhAnh}
              style={{ width: 220, height: 220 }}
            />
          </div>
          <div
            className="flex flex-row font-sans gap-x-3 "
            style={{ alignItems: "baseline" }}
          >
            <div
              className="flex flex-col font-sans gap-y-5"
              style={{ width: "180px", textAlign: "left" }}
            >
              <span className="font-sans">Mã giảng viên</span>
              <span className="font-sans">Họ và tên</span>
              <span className="font-sans">Giới tính</span>
              <span className="font-sans">Ngày Sinh</span>
              <span className="font-sans">Số điện thoại</span>
              <span className="font-sans">Email</span>
              <span className="font-sans">Trạng thái</span>
              <span className="font-sans">Mã Khoa</span>
              <span className="font-sans">Tên Khoa</span>
              <span className="font-sans">Danh sách môn dạy</span>
            </div>
            <div
              className="flex flex-col gap-y-5"
              style={{ width: "250px", textAlign: "left" }}
            >
              <span>{teachers?.maGv}</span>
              <span>
                {teachers?.ho} {teachers?.ten}
              </span>
              <span>{teachers?.phai}</span>
              <span>{ngaySinh}</span>
              <span>{teachers?.sdt}</span>
              <span>{teachers?.email}</span>
              <span>{teachers?.tenStatus}</span>
              <span>{teachers?.maKhoa}</span>
              <span>{teachers?.tenKhoa}</span>
              <span>{teachers?.tenMhList}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
