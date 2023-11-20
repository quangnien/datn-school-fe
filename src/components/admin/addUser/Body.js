import { ADD_ROLE, ADD_USER, SET_ERRORS } from "../../../redux/actionTypes";
import { addRole, addUnit, addUser } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import ReactSelect from "react-select";
import Select from "@mui/material/Select";
import { Avatar, MenuItem } from "@mui/material";
import ImageUpload from "../../util/img/ImageUpload";
import { toast } from "react-toastify";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const store = useSelector((state) => state);
 
  // code new
  const roles = useSelector((state) => state.admin.allRole);

  const roleOptions = roles?.map((menu) => ({
    value: menu.roleCode,
    label: menu.roleName,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  //-------
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
    roleCodeList: []


  
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      hinhAnh: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Thêm ảnh không thành công!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addUser(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.userAdded) {
      setLoading(false);
      if (store.admin.userAdded) {
        setValue({
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
            roleCodeList: ""
        
        });
        setSelectedOptions([]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_USER, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.userAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm user</h1>
        </div>
        <Link to="/admin/getuserall" className="btn btn-[#157572] inline-block">
          <button className="block px-4 py-2  font-bold text-white rounded bg-[#157572]  hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
           <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>UserName *:</h1>

                <input
                  placeholder="UserName"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.username}
                  onChange={(e) => setValue({ ...value, username: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>PassWord *:</h1>

                <input
                  placeholder="PassWord"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.password}
                  onChange={(e) => setValue({ ...value, password: e.target.value })}
                />
              </div>

              <div className={classes.WrapInputLabel}>

                <h1 className={classes.LabelStyle}>Họ *:</h1>

                <input
                  placeholder="Họ"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.ho}
                  onChange={(e) => setValue({ ...value, ho: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên *:</h1>

                <input
                  placeholder="Tên"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.ten}
                  onChange={(e) => setValue({ ...value, ten: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Ngày Sinh *:</h1>
                <input
                  placeholder="Ngày Sinh"
                  className={classes.InputStyle}
                  type="date"
                  value={value.ngaySinh}
                  onChange={(e) =>
                    setValue({ ...value, ngaySinh: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Email *:</h1>

                <input
                  placeholder="Email"
                  required
                  className={classes.InputStyle}
                  type="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </div>
              
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Giới tính *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.phai}
                  onChange={(e) => setValue({ ...value, phai: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Nơi Sinh *:</h1>

                <input
                  placeholder="Nơi Sinh"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.noiSinh}
                  onChange={(e) =>
                    setValue({ ...value, noiSinh: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Địa chỉ *:</h1>

                <input
                  placeholder="Địa Chỉ"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.diaChi}
                  onChange={(e) =>
                    setValue({ ...value, diaChi: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số điện thoại :</h1>

                <input
                  required
                  placeholder="Số điện thoại"
                  className={classes.InputStyle}
                  type="text"
                  value={value.sdt}
                  pattern="^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[6|8|9])([0-9]{8})$"
                  title="Vui lòng nhập số điện thoại đúng định dạng."
                  inputMode="numeric"
                  onChange={(e) => setValue({ ...value, sdt: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Chọn Menu *:</h1>
                <ReactSelect
                  isMulti
                  displayEmpty
                  name="values"
                  options={roleOptions}
                  value={selectedOptions}
                  onChange={(selectedOptions) => {
                    console.log("selectedOptions",selectedOptions)
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
                  src={value.hinhAnh}
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

            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
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
                    roleCodeList: []
                  });
                  setError({});
                  setSelectedOptions([]);
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Xóa
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang role..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="157572"
                />
              )}
              {error.message ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
