import { toast } from "react-toastify";
import {
  ADD_DANG_KY_MON,
  DELETE_DKM,
  GET_ALL_DSLOPTC_SV,
  GET_ALL_KHN,
  GET_ALL_SCORE_STUDENT,
  GET_ALL_SCORE_STUDENT0,
  GET_ALL_SCORE_STUDENT1,
  GET_ALL_UNIT,
  GET_COURSE_BY_SOMETHING,
  GET_STUDENT_BY_ID,
  GET_TKB_STUDENT,
  SET_ERRORS,
  STUDENT_UPW,
} from "../actionTypes";
import * as api from "../api/apiStudent";

export const studentUpwStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.studentUpwStudent(formData);

    if (data.status === "success") {
      toast.success("Đối mật khẩu thành công!");
      dispatch({ type: STUDENT_UPW, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành không!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllUnitStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUnitStudent();
    console.log("data", data);
    // dispatch({ type: GET_ALL_UNIT, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_UNIT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCoursebysomethingStudent =
  (requestData) => async (dispatch) => {
    try {
      const { data } = await api.getAllCoursebysomethingStudent(requestData);

      dispatch({ type: GET_COURSE_BY_SOMETHING, payload: data.retObj });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const dangKymonStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.dangKymonStudent(formData);
    if (data.status === "success" && data.retObj.maSv !== null) {
      toast.success("Đăng ký môn thành công!");
      dispatch({ type: ADD_DANG_KY_MON, payload: true });
    } else {
      toast.error("Không thể đăng ký môn học này do bị trùng môn học!");
      dispatch({
        type: SET_ERRORS,
        payload: "Không thể đăng ký môn này này do bị trùng môn học!",
      });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const deleteDkmStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteDkmStudent(formData);
    if (data.status === "success") {
      toast.success("Huỷ đăng ký môn thành công!");
      dispatch({ type: DELETE_DKM, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const getStudentByIdStudent = (id) => async (dispatch) => {
  try {
    console.log("runing...");
    const { data } = await api.getStudentByIdStudent(id);
    console.log("data", data);

    dispatch({ type: GET_STUDENT_BY_ID, payload: data });
  } catch (error) {
    console.log("running13");
    console.log(error);
  }
};

export const getScoreStudent = (maSv, maKeHoach) => async (dispatch) => {
  try {
    const { data } = await api.getScoreStudent(maSv, maKeHoach);
    dispatch({ type: GET_ALL_SCORE_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllDsLtcSinhVien = (maSv) => async (dispatch) => {
  try {
    const { data } = await api.getAllDsLtcSinhVien(maSv);

    dispatch({ type: GET_ALL_DSLOPTC_SV, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTKBStudent = (maSv, tuan, maKeHoach) => async (dispatch) => {
  try {
    const { data } = await api.getAllTKBStudent(maSv, tuan, maKeHoach);
    dispatch({ type: GET_TKB_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllKHNStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllKHNStudent();
    // dispatch({ type: GET_ALL_KHN, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_KHN, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getScoreStudent1Student = (maSV) => async (dispatch) => {
  try {
    const { data } = await api.getScoreStudent1Student(maSV);
    console.log("data", data);
    dispatch({ type: GET_ALL_SCORE_STUDENT1, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getScoreStudent0Student = (maSV) => async (dispatch) => {
  try {
    const { data } = await api.getScoreStudent0Student(maSV);
    dispatch({ type: GET_ALL_SCORE_STUDENT0, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
