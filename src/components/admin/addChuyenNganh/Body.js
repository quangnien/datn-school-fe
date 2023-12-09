import { ADD_CHUYENNGANH, ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import { addChuyenNganh, addDepartment } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import { MenuItem, Select } from "@mui/material";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [value, setValue] = useState({
    tenCn: "",
    maCn: "",
    maKhoa: "",
    // sdt: "0961319365",
    // email: "123meomeo@gmail.com",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addChuyenNganh(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.chuyenNganhAdded) {
      setLoading(false);
      if (store.admin.chuyenNganhAdded) {
        setValue({
          tenCn: "",
          maCn: "",
          maKhoa: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_CHUYENNGANH, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.chuyenNganhAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm Chuyên Ngành Mới</h1>
        </div>
        <Link to="/admin/getchuyennganhall" className="">
          <button className="mt-5 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
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
                <h1 className={classes.LabelStyle}>Mã chuyên ngành *:</h1>

                <input
                  placeholder="Mã chuyên ngành"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.maCn}
                  onChange={(e) =>
                    setValue({ ...value, maCn: e.target.value })
                  }
                />
              </div>

              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên chuyên ngành *:</h1>
                <input
                  placeholder="Tên chuyên ngành"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.tenCn}
                  onChange={(e) =>
                    setValue({ ...value, tenCn: e.target.value })
                  }
                />
              </div>

              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Khoa *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.maKhoa}
                  onChange={(e) =>
                    setValue({ ...value, maKhoa: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">Chưa chọn</MenuItem>
                  {departments?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.maKhoa}>
                      {dp.tenKhoa}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {/* <div className={classes.WrapInputLabel}>
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
              </div> */}
              {/* <div className={classes.WrapInputLabel}>
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
              </div> */}
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    tenCn: "",
                    maCn: "",
                    maKhoa: "",
                  });
                  setError({});
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
                  message="Đang thêm chuyên ngành..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
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
