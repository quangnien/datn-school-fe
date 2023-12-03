import { toast } from "react-toastify";
import * as FileSaver from "file-saver";

import {
  ADD_COURSE_DETAIL,
  ADD_COURSE,
  ADD_DEPARTMENT,
  ADD_STUDENT,
  ADD_SUBJECT,
  ADD_TEACHER,
  ADD_UNIT,
  DELETE_COURSE,
  DELETE_DEPARTMENT,
  DELETE_STUDENT,
  DELETE_SUBJECT,
  DELETE_TEACHER,
  DELETE_UNIT,
  GET_ALL_COURSE_DETAIL,
  GET_ALL_COURSE,
  GET_ALL_DEPARTMENT,
  GET_ALL_STUDENT,
  GET_ALL_SUBJECT,
  GET_ALL_TEACHER,
  GET_ALL_UNIT,
  GET_COURSE_UNIT,
  GET_SCORE_COURSE,
  GET_STUDENT_BY_ID,
  GET_STUDENT_UNIT,
  GET_TEACHER_DEPARTMENT,
  GET_UNIT_DEPARTMENT,
  SET_ERRORS,
  UPDATE_COURSE,
  UPDATE_DEPARTMENT,
  UPDATE_STUDENT,
  UPDATE_SUBJECT,
  UPDATE_TEACHER,
  UPDATE_UNIT,
  UPDATE_SCORE,
  DELETE_DANGKYMON,
  UPDATE_PASSWORD,
  GET_SUBJECT_DEPARTMENT,
  GET_COURSE_BY_KEHOACHNAM,
  GET_THONGKE_BY_SOMETHING,
  GET_COURSE_BY_SOMETHING,
  GET_ALL_COURSE_BY_MKH,
  GET_ALL_COURSE_BY_UNIMKH,
  GET_COURSEDETAIL_COURSE,
  UPDATE_COURSEDETAIL,
  DELETE_COURSEDETAIL,
  GET_ALL_KHN,
  GET_ALL_MHTQ,
  GET_ALL_MENU,
  ADD_MENU,
  UPDATE_MENU,
  DELETE_MENU,
  ADD_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GET_ALL_ROLE,
  GET_ALL_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  IMPORT_STUDENTS,
  EXPORT_STUDENTS,
  GET_CURRENT_USER,
  ADD_CMMNCD,
  GET_ALL_CMMNCD,
  GET_ALL_CMMNCDSV,
  GET_ALL_CMMNCDGV,
  UPDATE_CMMNCD,
  IMPORT_DIEMS,
  EXPORT_DIEMS,
  DELETE_CMMNCD,
  ADD_CHUYENNGANH,
  UPDATE_CHUYENNGANH,
  DELETE_CHUYENNGANH,
  GET_ALL_CHUYENNGANH,
  GET_UNIT_CHUYENNGANH,
} from "../actionTypes";
import * as api from "../api";

//getAll
export const getAllDepartment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDepartment();
    // dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllChuyenNganh = () => async (dispatch) => {
  try {
    const { data } = await api.getAllChuyenNganh();
    // dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_CHUYENNGANH, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllTeacher = (redata) => async (dispatch) => {
  try {
    const { data } = await api.getAllTeacher(redata);
    // dispatch({ type: GET_ALL_TEACHER, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_TEACHER, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllUnit = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUnit();
    // dispatch({ type: GET_ALL_UNIT, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_UNIT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllSubject = () => async (dispatch) => {
  try {
    const { data } = await api.getAllSubject();
    dispatch({ type: GET_ALL_SUBJECT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllRole = () => async (dispatch) => {
  try {
    const { data } = await api.getAllRole();
    dispatch({ type: GET_ALL_ROLE, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUser();
    dispatch({ type: GET_ALL_USER, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllStudent();
    // dispatch({ type: GET_ALL_STUDENT, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_STUDENT, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourse();
    // dispatch({ type: GET_ALL_COURSE, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_COURSE, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCourseDetail = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseDetail();
    // dispatch({ type: GET_ALL_COURSE_DETAIL, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_COURSE_DETAIL, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllKHN = () => async (dispatch) => {
  try {
    const { data } = await api.getAllKHN();
    // dispatch({ type: GET_ALL_KHN, payload: data.retObj[0] });
    dispatch({ type: GET_ALL_KHN, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllMenu = () => async (dispatch) => {
  try {
    const { data } = await api.getAllMenu();
    dispatch({ type: GET_ALL_MENU, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCmmnCd = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCmmnCd();
    console.log("runing")
    dispatch({ type: GET_ALL_CMMNCD, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCmmnCdSv = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCmmnCdSv();
    dispatch({ type: GET_ALL_CMMNCDSV, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCmmnCdGv = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCmmnCdGv();
    console.log("data",data)
    dispatch({ type: GET_ALL_CMMNCDGV, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

// Add
export const addDepartment = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    // debugger;
    const { data } = await api.addDepartment(formData);
    if (data.status === "success") {
      toast.success("Thêm khoa mới thành công!");
      dispatch({ type: ADD_DEPARTMENT, payload: true });
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

// Add
export const addChuyenNganh = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    // debugger;
    const { data } = await api.addChuyenNganh(formData);
    if (data.status === "success") {
      toast.success("Thêm chuyên ngành mới thành công!");
      dispatch({ type: ADD_CHUYENNGANH, payload: true });
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

export const addMenu = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    // debugger;
    const { data } = await api.addMenu(formData);
    if (data.status === "success") {
      toast.success("Thêm menu mới thành công!");
      dispatch({ type: ADD_MENU, payload: true });
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

export const addCmmnCd = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    // debugger;
    const { data } = await api.addCmmnCd(formData);
    if (data.status === "success") {
      toast.success("Thêm Common Code mới thành công!");
      dispatch({ type: ADD_CMMNCD, payload: true });
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

export const addTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addTeacher(formData);
    if (data.status === "success") {
      toast.success("Thêm giảng viên mới thành công!");
      dispatch({ type: ADD_TEACHER, payload: true });
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
export const addUnit = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addUnit(formData);
    if (data.status === "success") {
      toast.success("Thêm lớp học mới thành công!");
      dispatch({ type: ADD_UNIT, payload: true });
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
export const addStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addStudent(formData);
    if (data.status === "success") {
      toast.success("Thêm sinh viên mới thành công!");
      dispatch({ type: ADD_STUDENT, payload: true });
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

export const addSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addSubject(formData);
    if (data.status === "success") {
      toast.success("Thêm môn học mới thành công!");
      dispatch({ type: ADD_SUBJECT, payload: true });
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

export const addRole = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addRole(formData);
    if (data.status === "success") {
      toast.success("Thêm role mới thành công!");
      dispatch({ type: ADD_ROLE, payload: true });
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

export const addUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addUser(formData);
    if (data.status === "success") {
      toast.success("Thêm user mới thành công!");
      dispatch({ type: ADD_USER, payload: true });
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
export const addCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(formData);
    if (data.status === "success") {
      toast.success("Thêm lớp tín chỉ mới thành công!");
      dispatch({ type: ADD_COURSE, payload: true });
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
export const addCourseDetail = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCourseDetail(formData);
    if (data.status === "success") {
      toast.success("Thêm chi tiết lớp tín chỉ mới thành công!");
      dispatch({ type: ADD_COURSE_DETAIL, payload: true });
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

//update
export const updateDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateDepartment(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa Khoa thành công!");
      dispatch({ type: UPDATE_DEPARTMENT, payload: true });
    } else {
      toast.error("Chỉnh sửa khoa không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateChuyenNganh = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateChuyenNganh(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa chuyên ngành thành công!");
      dispatch({ type: UPDATE_CHUYENNGANH, payload: true });
    } else {
      toast.error("Chỉnh sửa chuyên ngành không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateMenu = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateMenu(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa menu thành công!");
      dispatch({ type: UPDATE_MENU, payload: true });
    } else {
      toast.error("Chỉnh sửa menu không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateCmmnCd = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCmmnCd(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa Common Code thành công!");
      dispatch({ type: UPDATE_CMMNCD, payload: true });
    } else {
      toast.error("Chỉnh sửa Common Code không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};


export const updateUnit = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUnit(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa lớp học thành công!");
      dispatch({ type: UPDATE_UNIT, payload: true });
    } else {
      toast.error("Chỉnh sửa lớp học không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateSubject(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa môn học thành công!");
      dispatch({ type: UPDATE_SUBJECT, payload: true });
    } else {
      toast.error("Chỉnh sửa môn học không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateRole = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateRole(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa role thành công!");
      dispatch({ type: UPDATE_ROLE, payload: true });
    } else {
      toast.error("Chỉnh sửa role không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa user thành công!");
      dispatch({ type: UPDATE_USER, payload: true });
    } else {
      toast.error("Chỉnh sửa user không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa sinh viên thành công!");
      dispatch({ type: UPDATE_STUDENT, payload: true });
    } else {
      toast.error("Chỉnh sửa sinh viên không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateTeacher(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa giảng viên thành công!");
      dispatch({ type: UPDATE_TEACHER, payload: true });
    } else {
      toast.error("Chỉnh sửa giảng viên không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa lớp tín chỉ thành công!");
      dispatch({ type: UPDATE_COURSE, payload: true });
    } else {
      toast.error("Chỉnh sửa lớp tín chỉ không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateCourseDetail = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCourseDetail(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa chi tiết lớp tín chỉ thành công!");
      dispatch({ type: UPDATE_COURSEDETAIL, payload: true });
    } else {
      toast.error("Chỉnh sửa chi tiết lớp tín chỉ không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateScore = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateScore(formData);
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
export const updatePassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePassword(formData);

    if (data.status === "success") {
      toast.success("Đổi mật khẩu thành công!");
      dispatch({ type: UPDATE_PASSWORD, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành công!");
    }
  } catch (error) {
    console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

// delete
export const deleteDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteDepartment(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa khoa thành công!");
      dispatch({ type: DELETE_DEPARTMENT, payload: true });
    } else {
      toast.error("Xóa Khoa này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa Khoa không Thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa Khoa không Thành công" });
  }
};

export const deleteChuyenNganh = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteChuyenNganh(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa chuyên ngành thành công!");
      dispatch({ type: DELETE_CHUYENNGANH, payload: true });
    } else {
      toast.error("Xóa chuyên ngành này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa chuyên ngành không Thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa chuyên ngành không Thành công" });
  }
};

export const deleteMenu = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteMenu(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa menu thành công!");
      dispatch({ type: DELETE_MENU, payload: true });
    } else {
      toast.error("Xóa menu này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa menu không Thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa menu không Thành công" });
  }
};


export const deleteCmmnCd = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCmmnCd(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa Common Code thành công!");
      dispatch({ type: DELETE_CMMNCD, payload: true });
    } else {
      toast.error("Xóa Common Code này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa Common Code không Thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa Common Code không Thành công" });
  }
};

export const deleteUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa user thành công!");
      dispatch({ type: DELETE_USER, payload: true });
    } else {
      toast.error("Xóa user này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa user không Thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa user không Thành công" });
  }
};
export const deleteUnit = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteUnit(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa lớp học thành công!");
      dispatch({ type: DELETE_UNIT, payload: true });
    } else {
      toast.error("Xóa Lớp này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa lớp không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const deleteStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteStudent(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa sinh viên thành công!");
      dispatch({ type: DELETE_STUDENT, payload: true });
    } else {
      toast.error("Xóa sinh viên này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không Thành công" });
  }
};
export const deleteTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteTeacher(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa giảng viên thành công!");
      dispatch({ type: DELETE_TEACHER, payload: true });
    } else {
      toast.error("Xóa giảng viên này không thành không!");
      dispatch({
        type: SET_ERRORS,
        payload: "Xóa giảng viên không thành công",
      });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa giảng viên không Thành công" });
  }
};
export const deleteCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa lớp tín chỉ thành công!");
      dispatch({ type: DELETE_COURSE, payload: true });
    } else {
      toast.error("Xóa lớp tín chỉ này không thành không!");
      dispatch({
        type: SET_ERRORS,
        payload: "Xóa lớp tín chỉ không thành công",
      });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa lớp tín chỉ không Thành công" });
  }
};

export const deleteCourseDetail = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourseDetail(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa chi tiết lớp tín chỉ thành công!");
      dispatch({ type: DELETE_COURSEDETAIL, payload: true });
    } else {
      toast.error("Xóa chi tiết lớp tín chỉ này không thành không!");
      dispatch({
        type: SET_ERRORS,
        payload: "Xóa chi tiết lớp tín chỉ không thành công",
      });
    }
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: "Xóa chi tiết lớp tín chỉ không Thành công",
    });
  }
};

export const deleteSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteSubject(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa môn học thành công!");
      dispatch({ type: DELETE_SUBJECT, payload: true });
    } else {
      toast.error("Xóa môn học này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa Môn học không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa Môn học không Thành công" });
  }
};

export const deleteRole = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteRole(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa role thành công!");
      dispatch({ type: DELETE_ROLE, payload: true });
    } else {
      toast.error("Xóa role này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa role không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa role không Thành công" });
  }
};

export const deleteDangkymon = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteDangkymon(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa điểm thành công!");
      dispatch({ type: DELETE_DANGKYMON, payload: true });
    } else {
      toast.error("Xóa điểm không thành công!");
      dispatch({ type: SET_ERRORS, payload: "Xóa điểm không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa điểm không Thành công" });
  }
};
// get...bysomething
export const getTeacherDepartment =
  (department, page, size) => async (dispatch) => {
    try {
      const { data } = await api.getTeacherDepartment(department, page, size);
      dispatch({ type: GET_TEACHER_DEPARTMENT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const getStudentUnit = (unit, page, size) => async (dispatch) => {
  try {
    const { data } = await api.getStudentUnit(unit, page, size);

    dispatch({ type: GET_STUDENT_UNIT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUnitChuyenNganh = (chuyennganh) => async (dispatch) => {
  try {
    const { data } = await api.getUnitChuyenNganh(chuyennganh);
    dispatch({ type: GET_UNIT_CHUYENNGANH, payload: data });
  } catch (error) {
    // console.log("error.response.data", error.response.data);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getCourseUnit = (unit) => async (dispatch) => {
  try {
    const { data } = await api.getCourseUnit(unit);
    dispatch({ type: GET_COURSE_UNIT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getScoreCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.getScoreCourse(course);
    dispatch({ type: GET_SCORE_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getSubjectDepartment =
  (department, page, size) => async (dispatch) => {
    try {
      const { data } = await api.getSubjectDepartment(department, page, size);
      dispatch({ type: GET_SUBJECT_DEPARTMENT, payload: data });
    } catch (error) {
      // console.log("error.response.data", error.response.data);
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
//
export const getAllCoursebyUnitMKH = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebyUnitMKH(requestData);

    dispatch({ type: GET_ALL_COURSE_BY_UNIMKH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllCourseDetailCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseDetailCourse(course);
    dispatch({ type: GET_COURSEDETAIL_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
// getbyid
export const getStudentById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getStudentById(id);
    dispatch({ type: GET_STUDENT_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursebyKeHoachNam = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getCoursebyKeHoachNam(requestData);

    console.log("data", data);
    dispatch({ type: GET_COURSE_BY_KEHOACHNAM, payload: data.retObj });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getThongkebysomething = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getThongkebysomething(requestData);

    dispatch({ type: GET_THONGKE_BY_SOMETHING, payload: data.retObj });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllCoursebysomething = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebysomething(requestData);

    dispatch({ type: GET_COURSE_BY_SOMETHING, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllCoursebyMKH = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebyMKH(requestData);

    dispatch({ type: GET_ALL_COURSE_BY_MKH, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getMhtq = () => async (dispatch) => {
  try {
    const { data } = await api.getMhtq();
    dispatch({ type: GET_ALL_MHTQ, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

// import students
export const importStudent = (formData, unit) => async (dispatch) => {
  try {
    const { data } = await api.importStudent(formData, unit);

    if (data.status === "success") {
      toast.success("import file students thành công!");
      dispatch({ type: IMPORT_STUDENTS, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("import file students không thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};


export const exportStudent = (unit) => async (dispatch) => {
  try {
    const response = await api.exportStudent(unit);
    const fileData = new Blob([response.data], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(fileData, "template_add_students.xls");

    dispatch({ type: EXPORT_STUDENTS, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Lỗi xuất file dữ liệu" });
  }
};

// GET CURR
export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await api.getCurrentUser();
    dispatch({ type: GET_CURRENT_USER, payload: data.menuCodeList });
  } catch (error) {
    console.log("Redux Error", error);
  }
};


// import diem
export const importDiem = (formData, maLopTc) => async (dispatch) => {
  try {
    const { data } = await api.importDiem(formData, maLopTc);

    if (data.status === "success") {
      toast.success("import file diems thành công!");
      dispatch({ type: IMPORT_DIEMS, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("import file students không thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const exportDiem = (maLopTc) => async (dispatch) => {
  try {
    const response = await api.exportDiem(maLopTc);
    const fileData = new Blob([response.data], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(fileData, "template_add_diems.xls");

    dispatch({ type: EXPORT_DIEMS, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Lỗi xuất file dữ liệu" });
  }
};