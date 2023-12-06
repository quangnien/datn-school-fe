import React from "react";
import ReactModal from "react-modal";
import * as classes from "../../../utils/styles";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { format } from "date-fns";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const DetailStudent = ({ student, isOpen, onClose }) => {
  return (
    <ReactModal
      style={modalStyles}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="items-center justify-center">
        <div className="w-[808px] min-h-[100px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto">
          <div className="flex mt-10 mb-10 gap-x-16">
            {/* hình ảnh */}
            <div className="w-[220px] h-[220px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
              <Avatar
                src={student.hinhAnh}
                style={{ width: 220, height: 220 }}
              />
            </div>
            {/* thông tin chi tiết */}
            <divx
              className="flex flex-row font-sans gap-x-3 "
              style={{ alignItems: "baseline" }}
            >
              <div
                className="flex flex-col font-sans gap-y-5"
                style={{ width: "160px", textAlign: "left" }}
              >
              <span className="font-sans">Mã sinh viên        </span>
              <span className="font-sans">Họ và tên           </span>
              <span className="font-sans">Giới tính           </span>
              <span className="font-sans">Ngày Sinh           </span>
              <span className="font-sans">Nơi sinh            </span>
              <span className="font-sans">Địa chỉ             </span>
              <span className="font-sans">Số điện thoại       </span>
              <span className="font-sans">Email               </span>
              <span className="font-sans">Trạng thái          </span>
              <span className="font-sans">Mã lớp              </span>
              <span className="font-sans">Tên lớp             </span>
              <span className="font-sans">Mã khoa             </span>
              <span className="font-sans">Tên khoa            </span>
              <span className="font-sans">Mã chuyên ngành     </span>
              <span className="font-sans">Tên chuyên ngành    </span>
              </div>
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "250px", textAlign: "left" }}
              >
                <span>{student?.maSv}</span>
                <span>
                  {student?.ho} {student?.ten}
                </span>
                <span>{student?.phai}</span>

                <span>{format(new Date(student?.ngaySinh), "dd/MM/yyyy")}</span>

                <span>{student?.noiSinh}</span>
                <span>{student?.diaChi}</span>
                <span>{student?.sdt}</span>
                <span>{student?.email}</span>

                <span>{student?.tenStatus}</span>
                <span>{student?.maLop}</span>
                <span>{student?.tenLop}</span>
                <span>{student?.maKhoa}</span>
                <span>{student?.tenKhoa}</span>
                <span>{student?.maCn}</span>
                <span>{student?.tenCn}</span>
              </div>
            </divx>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              className={classes.adminFormClearButton}
              type="button"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default DetailStudent;
