import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Spinner from "../../../utils/Spinner";
import Swal from "sweetalert2";
import {
  deleteRole,
  deleteUser,
  getAllRole,
  getAllUser,
  updateRole,
  updateUser,
} from "../../../redux/actions/adminActions";
import {
  DELETE_ROLE,
  DELETE_USER,
  SET_ERRORS,
  UPDATE_ROLE,
  UPDATE_USER,
} from "../../../redux/actionTypes";
import ReactSelect from "react-select";
import { Avatar, MenuItem, Select } from "@mui/material";
import { format } from "date-fns";
import ImageUpload from "../../util/img/ImageUpload";
import { toast } from "react-toastify";

// http://localhost:9090/api/admin/monHoc/khoa/CNTT?page=0&size=3

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);



  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const roles = useSelector((state) => state.admin.allRole);
  const users = useSelector((state) => state.admin.allUser);
  console.log("roles", users)

  const initialUses = roles;
  const roleOptions = initialUses?.map((sub) => ({
    value: sub.roleCode,
    label: sub.roleName,
  }));

  useEffect(() => {
    dispatch(getAllRole());
  }, []);

  useEffect(() => {
    if (users?.length !== 0 || users?.length === 0) {
      setLoading(false);
    }
  }, [users]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // Begin edit
  // giá trị 
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    username: "",
    password: "",
    ho: "",
    ten: "",
    phai: "",
    ngaySinh: "",
    noiSinh: "",
    diaChi: "",
    trangThai: "1",
    sdt: "",
    email: "",
    roleCodeList: [],
    id: "",

  });

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setValue({
      id: user.id,
      username: user.username,
    password: "",
    ho: "",
    ten: "",
    phai: "",
    ngaySinh: "",
    noiSinh: "",
    diaChi: "",
    trangThai: "1",
    sdt: "",
    email: "",
    roleCodeList: [],

    });
    setSelectedOptions(
      (user.roleCodeList || []).map((value, index) => ({
        value: value,
        label: user.roleNameList[index],
      }))
    );
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      hinhAnh: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("load image error!");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedValue = {};
    if (value.username !== "") {
      updatedValue.username = value.username;
    } else {
      updatedValue.username = selectedUser.username;
    }
    if (value.password !== "") {
      updatedValue.password = value.password;
    } else {
      updatedValue.password = selectedUser.username;
    }
    if (value.ho !== "") {
      updatedValue.ho = value.ho;
    } else {
      updatedValue.ho = selectedUser.ho;
    }
    if (value.ten !== "") {
      updatedValue.ten = value.ten;
    } else {
      updatedValue.ten = selectedUser.ten;
    }
    if (value.phai !== "") {
      updatedValue.phai = value.phai;
    } else {
      updatedValue.phai = selectedUser.phai;
    }
    if (value.ngaySinh !== "") {
      updatedValue.ngaySinh = value.ngaySinh;
    } else {
      updatedValue.ngaySinh = selectedUser.ngaySinh;
    }
    if (value.noiSinh !== "") {
      updatedValue.noiSinh = value.noiSinh;
    } else {
      updatedValue.noiSinh = selectedUser.noiSinh;
    }
    if (value.diaChi !== "") {
      updatedValue.diaChi = value.diaChi;
    } else {
      updatedValue.diaChi = selectedUser.diaChi;
    }
    if (value.trangThai !== "") {
      updatedValue.trangThai = value.trangThai;
    } else {
      updatedValue.trangThai = selectedUser.trangThai;
    }
    if (value.sdt !== "") {
      updatedValue.sdt = value.sdt;
    } else {
      updatedValue.sdt = selectedUser.sdt;
    }
    if (value.email !== "") {
      updatedValue.email = value.email;
    } else {
      updatedValue.email = selectedUser.email;
    }

    

    if (value.roleCodeList !== "") {
      updatedValue.roleCodeList = value.roleCodeList;
    } else {
      updatedValue.roleCodeList = selectedUser.roleCodeList;
    }
    dispatch(updateUser({ ...selectedUser, ...updatedValue }));
    dispatch({ type: UPDATE_USER, payload: false });
  };

  useEffect(() => {
    if (!store.admin.updatedUser) return;
    setError({});
    closeModal();
    dispatch(getAllUser());

  }, [dispatch, store.errors, store.admin.updatedUser]);
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
        dispatch(deleteUser(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.userDeleted) {
      setLoading(false);
      setCheckedValue([]);

      dispatch(getAllUser());
      dispatch({ type: DELETE_USER, payload: false });
    }
  }, [store.admin.userDeleted]);

  useEffect(() => {
    if (!store.errors) return;

    dispatch(getAllUser());
  }, [store.errors]);

  // End delete

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/addUser" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {users && users.length !== 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(users && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>

      <div className="w-full min-h-[427px]">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && users?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}

            {users?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">loading ...</p>
            )}
          </div>

          { !loading && users?.length !== 0 && (
            <div className="overflow-auto max-h-[450px]">
              <table className="w-full table-auto">
              <thead className="sticky top-0 bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-1">Chọn</th>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">UserName</th>
                    <th className="px-4 py-1">Họ</th>
                    <th className="px-4 py-1">Tên</th>
                    <th className="px-4 py-1">Email</th>
                    <th className="px-4 py-1" style={{ width: "170px" }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {users?.map((sub, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-1 border">
                        <input
                          onChange={handleInputChange}
                          checked={checkedValue.includes(sub.id)}
                          value={sub.id}
                          type="checkbox"
                          className="accent-[#157572]"
                        />
                      </td>
                      <td className="px-4 py-1 border">{idx + 1}</td>

                      <td className="px-4 py-1 border">{sub.username}</td>
                      <td
                        className="px-4 py-1 border"
                        style={{ width: "300px" }}
                      >
                        {sub.ho}
                      </td>
                      <td
                        className="px-4 py-1 border"
                        style={{ width: "300px" }}
                      >
                        {sub.ten}
                      </td>
                      <td
                        className="px-4 py-1 border"
                        style={{ width: "300px" }}
                      >
                        {sub.email}
                      </td>
                      {/* <td className="px-4 py-1 border">
                        {sub.menuNameList?.map((item) => (
                          <div>{item}</div>
                        ))}
                      </td> */}

                      <td className="px-4 py-1 border">
                        <div
                          className="flex justify-center"
                          style={{ width: "100%", alignItems: "center" }}
                        >
                          <button
                            className="px-3 h-full py-[0.7] font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                            onClick={() => handleEditClick(sub)}
                          >
                            Sửa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* modal edit */}
      {selectedUser ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          {/* <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[400px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-4 mt-4 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Role:</h1>
                  <input
                    placeholder={selectedR?.roleCode}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.roleCode}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên Role :</h1>
                  <input
                    placeholder={selectedR?.roleName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.roleName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        roleName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chọn Menu *:</h1>

                  <ReactSelect
                    isMulti
                    displayEmpty
                    name="values"
                    options={menuOptions}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      setSelectedOptions(selectedOptions);
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      setValue((prevValue) => ({
                        ...prevValue,
                        menuCodeList: [...selectedValues],
                      }));
                    }}
                    classNamePrefix="select"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/getroleall" className="btn btn-primary">
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
          </div> */}
           <div className={classes.Form1}>
            <form className={classes.Form2} onSubmit={handleFormSubmit}>
              {/* item */}
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>UserName:</h1>
                  <input
                    placeholder={selectedUser.username}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}> Mật khẩu:</h1>
                  <input
                    placeholder={selectedUser.password}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ho}
                    onChange={(e) => setValue({ ...value, password: e.target.value })}
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}> Họ:</h1>
                  <input
                    placeholder={selectedUser.ho}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ho}
                    onChange={(e) => setValue({ ...value, ho: e.target.value })}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên :</h1>
                  <input
                    placeholder={selectedUser.ten}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ten}
                    onChange={(e) =>
                      setValue({ ...value, ten: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giới tính :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.phai || selectedUser.phai}
                    onChange={(e) =>
                      setValue({ ...value, phai: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </Select>
                </div>

                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Ngày Sinh :</h1>

                  <input
                    placeholder={format(
                      new Date(selectedUser.ngaySinh),
                      "MM/dd/yyyy"
                    )}
                    className={classes.InputStyle}
                    type={inputType}
                    value={value.ngaySinh}
                    onChange={(e) =>
                      setValue({ ...value, ngaySinh: e.target.value })
                    }
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                  />
                </div> */}

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Nơi Sinh :</h1>
                  <input
                    placeholder={selectedUser.noiSinh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.noiSinh}
                    onChange={(e) =>
                      setValue({ ...value, noiSinh: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Địa Chỉ :</h1>
                  <input
                    placeholder={selectedUser.diaChi}
                    className={classes.InputStyle}
                    type="text"
                    value={value.diaChi}
                    onChange={(e) =>
                      setValue({ ...value, diaChi: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Trang thai :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.trangThai || selectedUser.trangThai}
                    onChange={(e) =>
                      setValue({ ...value, trangThai: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="0">UnActive</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Điện thoại :</h1>
                  <input
                    placeholder={selectedUser.sdt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.sdt}
                    onChange={(e) =>
                      setValue({ ...value, sdt: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Email :</h1>
                  <input
                    placeholder={selectedUser.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chọn Role *:</h1>

                  <ReactSelect
                    isMulti
                    displayEmpty
                    name="values"
                    options={roleOptions}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      setSelectedOptions(selectedOptions);
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      setValue((prevValue) => ({
                        ...prevValue,
                        roleCodeList: [...selectedValues],
                      }));
                    }}
                    classNamePrefix="select"
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-6">
                <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
                  <Avatar
                    src={value.hinhAnh || selectedUser.hinhAnh}
                    style={{ width: 180, height: 180 }}
                  />
                </div>

                <div className="flex flex-col gap-y-5">
                  <h1 className="pb-2 text-sm font-medium text-left">
                    Hình ảnh sinh viên:
                  </h1>
                  <ImageUpload
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </div>
              </div>

              {/* buton */}
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/getuserall" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Hủy
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
