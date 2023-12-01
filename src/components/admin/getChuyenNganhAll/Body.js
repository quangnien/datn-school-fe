import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteChuyenNganh,
  getAllChuyenNganh,
  getAllDepartment,
  updateChuyenNganh,
  updateDepartment,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { deleteDepartment } from "../../../redux/actions/adminActions";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  DELETE_CHUYENNGANH,
  DELETE_DEPARTMENT,
  SET_ERRORS,
  UPDATE_CHUYENNGANH,
  UPDATE_DEPARTMENT,
} from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const chuyennganhs = useSelector((state) => state.admin.allChuyenNganh);
  const departments = useSelector((state) => state.admin.allDepartment);

  // debugger;
  if(chuyennganhs != null){
    
    chuyennganhs.sort((a, b) => a.tenCn.charCodeAt(0) - b.tenCn.charCodeAt(0));
  }
  const [selectedChuyenNganh, setSelectedChuyenNganh] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChuyenNganh());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    maCn: "",
    tenCn: "",
    maKhoa: "",
    id: "",
  });
  const handleEditClick = (dep) => {
    setSelectedChuyenNganh(dep);
    setIsModalOpen(true);
    setValue({
      tenCn: "",
      maKhoa: "",
      maCn: dep.maCn,
      id: dep.id,
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.tenCn !== "") {
      updatedValue.tenCn = value.tenCn;
    } else {
      updatedValue.tenCn = selectedChuyenNganh.tenCn;
    }
    if (value.maKhoa !== "") {
      updatedValue.maKhoa = value.maKhoa;
    } else {
      updatedValue.maKhoa = selectedChuyenNganh.maKhoa;
    }
    dispatch(updateChuyenNganh({ ...selectedChuyenNganh, ...updatedValue }));
    dispatch({ type: UPDATE_CHUYENNGANH, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedChuyenNganh) {
      setError({});
      closeModal();
      dispatch(getAllChuyenNganh());
    }
  }, [dispatch, store.errors, store.admin.updatedChuyenNganh]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // Begin delete
  const [checkedValue, setCheckedValue] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  const dltSubject = (e) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, Xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteChuyenNganh(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.chuyenNganhDeleted) {
      setCheckedValue([]);
      dispatch(getAllChuyenNganh());
      dispatch({ type: DELETE_CHUYENNGANH, payload: false });
    }
  }, [store.admin.chuyenNganhDeleted]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/addChuyenNganh" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {chuyennganhs && checkedValue?.length > 0 ? (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
          >
            Xóa
          </button>
        ) : (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4"
            disabled
          >
            Xóa
          </button>
        )}
      </div>
      <div className="w-full my-8 mt-6">
        {chuyennganhs?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">Chọn</th>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Mã chuyên ngành</th>
                <th className="px-4 py-1">Tên chuyên ngành</th>
                <th className="px-4 py-1">Tên Khoa</th>
                <th className="px-4 py-1">Hành động</th>
              </tr>
            </thead>
            <tbody className="">
              {chuyennganhs?.map((dep, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  <td className="px-4 py-1 border text-center">
                    <input
                      onChange={handleInputChange}
                      checked={checkedValue.includes(dep.id)}
                      value={dep.id}
                      type="checkbox"
                      className="accent-[#157572]"
                    />
                  </td>
                  <td className="px-4 py-1 text-center border ">{idx + 1}</td>
                  <td className="px-4 py-1 text-left border">{dep.maCn}</td>
                  <td className="px-4 py-1 text-left border">
                    {dep.tenCn}
                  </td>
                  <td className="px-4 py-1 text-left border">
                    {dep?.tenKhoa}
                  </td>
                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(dep)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* modal edit */}
      {selectedChuyenNganh ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã chuyên ngành :</h1>
                  <input
                    placeholder={selectedChuyenNganh?.maCn}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên chuyên ngành :</h1>
                  <input
                    placeholder={selectedChuyenNganh?.tenCn}
                    className={classes.InputStyle}
                    type="text"
                    value={value.tenCn}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tenCn: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Khoa :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{
                      height: 36,
                      outline: "none",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.maKhoa || selectedChuyenNganh.maKhoa}
                    onChange={(e) =>
                      setValue({ ...value, maKhoa: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maKhoa}>
                        {dp.tenKhoa}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/getchuyennganhall" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Thoát
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;
