import { toast } from "react-toastify";
import * as FileSaver from "file-saver";
import {
  EXPORT_DIEMS_GV,
  GET_ALL_DEPARTMENT,
  GET_ALL_KHN,
  GET_COURSE_TEACHER_KHM,
  GET_SCORE_COURSE,
  GET_TEACHER_BY_ID,
  GET_THONGKE_BY_SOMETHING,
  GET_TKB_TEACHER,
  IMPORT_DIEMS_GV,
  SET_ERRORS,
  TEACHER_UPW,
  UPDATE_SCORE,
} from "../actionTypes";
import * as api from "../api/apiTeacher";

export const getAllDepartmentTeacher = () => async (dispatch) => {
  try {
    // debugger;
    const { data } = await api.getAllDepartmentTeacher();
    // dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getTeacherById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTeacherById(id);
    dispatch({ type: GET_TEACHER_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getScoreCourseTeacher = (course) => async (dispatch) => {
  try {
    const { data } = await api.getScoreCourseTeacher(course);
    dispatch({ type: GET_SCORE_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllKHNTeacher = () => async (dispatch) => {
  try {
    const { data } = await api.getAllKHNTeacher();
    // dispatch({ type: GET_ALL_KHN, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_KHN, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getCourseTeacherKHMTeacher =
  (maGv, maKeHoach) => async (dispatch) => {
    try {
      const { data } = await api.getCourseTeacherKHMTeacher(maGv, maKeHoach);
      dispatch({ type: GET_COURSE_TEACHER_KHM, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
export const getAllTKBTeacher = (maSv, tuan, maKeHoach) => async (dispatch) => {
  try {
    const { data } = await api.getAllTKBTeacher(maSv, tuan, maKeHoach);
    dispatch({ type: GET_TKB_TEACHER, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateScoreTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateScoreTeacher(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa điểm thành công!");
      dispatch({ type: UPDATE_SCORE, payload: true });
    } else {
      toast.error("Chỉnh sửa điểm không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getThongkebysomethingTeacher =
  (requestData) => async (dispatch) => {
    try {
      const { data } = await api.getThongkebysomethingTeacher(requestData);

      dispatch({ type: GET_THONGKE_BY_SOMETHING, payload: data.retObj });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const teacherUpw = (formData) => async (dispatch) => {
  try {
    const { data } = await api.teacherUpw(formData);

    if (data.status === "success") {
      toast.success("Đối mật khẩu thành công!");
      dispatch({ type: TEACHER_UPW, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành không!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

// import diem
export const importDiemTeacher = (formData, maLopTc) => async (dispatch) => {
  try {
    const { data } = await api.importDiemTeacher(formData, maLopTc);

    if (data.status === "success") {
      toast.success("import file diems thành công!");
      dispatch({ type: IMPORT_DIEMS_GV, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("import file students không thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const exportDiemTeacher = (maLopTc) => async (dispatch) => {
  try {
    const response = await api.exportDiemTeacher(maLopTc);
    const fileData = new Blob([response.data], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(fileData, "template_add_diems.xls");

    dispatch({ type: EXPORT_DIEMS_GV, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Lỗi xuất file dữ liệu" });
  }
};
