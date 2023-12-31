import axios from "axios";
const APIV2 = axios.create({ baseURL: "http://localhost:8080/" });

APIV2.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).retObj.jwt
    }`;
  }
  return req;
});

// thời khóa biểu

export const teacherUpw = (updatePassword) =>
  APIV2.put("/api/admin/updatePassword", updatePassword);
export const getTeacherById = (id) =>
  APIV2.get(`/api/admin/giangVien/${id}`, id);

export const getAllDepartmentTeacher = () => APIV2.get("/api/admin/khoa");

export const getScoreCourseTeacher = (course) =>
  APIV2.get(`api/admin/diem/lopTc/detail/${course}`, course);
export const getAllKHNTeacher = () => APIV2.get("/api/admin/keHoachNam");
export const getAllTKBTeacher = (maGv, tuan, maKeHoach) =>
  APIV2.get(
    `/api/admin/tkb/giangVien/${maGv}?tuan=${tuan}&maKeHoach=${maKeHoach}`
  );
export const updateScoreTeacher = (updateScore) =>
  APIV2.put("/api/admin/diem", updateScore);

export const getCourseTeacherKHMTeacher = (maGv, maKeHoach) =>
  APIV2.post(`api/admin/lopTc/giangVien/${maGv}?maKeHoach=${maKeHoach}`);
export const getThongkebysomethingTeacher = (data) =>
  APIV2.get("api/admin/diem/thong-ke", data);

export const importDiemTeacher = (data, maLopTc) =>
  APIV2.post(`/api/admin/diem/import/${maLopTc}`, data);

export const exportDiemTeacher = (maLopTc) =>
  APIV2.get(`/api/admin/diem/export/${maLopTc}`, {
    responseType: "blob",
  });
