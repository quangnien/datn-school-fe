import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SET_ERRORS, TEACHER_UPW } from "../../../redux/actionTypes";
import { teacherUpw } from "../../../redux/actions/teacherActions";

const Body = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("teacherUser"));

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const passwordsMatch = () => {
    return newPassword === confirmPassword;
  };
  const update = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!passwordsMatch()) {
      setError({
        message:
          "Mật khẩu và mật khẩu nhập lại không giống nhau, hãy nhập lại!",
      });
      setLoading(false);
      setConfirmPassword("");
    } else {
      // Gửi form đi

      dispatch(
        teacherUpw({
          userName: user?.retObj?.userDetails?.username,
          matKhauCu: oldPassword,
          matKhauMoi: newPassword,
        })
      );
    }
  };
  console.log("store", store);
  useEffect(() => {
    if (store.errors || store.teacher.teacherupwed) {
      setLoading(false);
      if (store.teacher.teacherupwed) {
        setNewPassword("");
        setConfirmPassword("");
        setOldPassword("");
        setLoading(false);
        setError("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: TEACHER_UPW, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.teacher.teacherupwed]);

  return (
    <div className="mx-5 mt-10 item-center">
      <div className="space-y-5">
        <div className="flex flex-col mr-10 bg-white rounded-xl">
          <form
            onSubmit={update}
            className="flex flex-col items-center my-8 space-y-6"
          >
            <h1 className="text-3xl font-bold text-gray-600">Đổi Mật Khẩu</h1>
            <div className="mx-1 space-y-1">
              <p className="text-[#515966] font-bold text-sm w-full">
                Mật khẩu cũ
              </p>

              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#DDDEEE]">
                <input
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  required
                  type={showPassword ? "text" : "password"}
                  className={`${classes.InputStyle} w-full`}
                  placeholder="Mật khẩu cũ"
                />
                <div>
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer "
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mx-1 space-y-1">
              <p className="text-[#515966] font-bold text-sm">Mật khẩu mới</p>
              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#DDDEEE]">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                  type={showPassword ? "text" : "password"}
                  className={classes.InputStyle}
                  placeholder="New Password"
                />
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="mx-1 space-y-1">
              <p className="text-[#515966] font-bold text-sm">
                Confirm mật khẩu
              </p>
              <div className="flex items-center w-full px-3 space-x-3 border-2 rounded-lg bg-[#DDDEEE]">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  type={showPassword ? "text" : "password"}
                  className={classes.InputStyle}
                  placeholder="Confirm Password"
                />
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Update
              </button>
            </div>
            {loading && (
              <Spinner
                message="Đang update mật khẩu..."
                height={30}
                width={150}
                color="#157572"
                messageColor="157572"
              />
            )}
            {error.message ? (
              <p className="text-red-500">{error.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
