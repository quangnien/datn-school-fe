import axios from "axios";

// const APIV2 = axios.create({ baseURL: "http://localhost:9090/" });
const APIV2 = axios.create({ baseURL: "http://localhost:8080/" });

APIV2.interceptors.request.use((req) => {
  if (localStorage.getItem("teacherUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("teacherUser")).retObj.jwt
    }`;
  }
  return req;
});

// thời khóa biểu

export const teacherUpw = (updatePassword) =>
  APIV2.put("/api/admin/updatePassword", updatePassword);
export const getTeacherById = (id) =>
  APIV2.get(`/api/admin/giangVien/${id}`, id);

export const getAllDepartment = () => APIV2.get("/api/admin/khoa");

export const getScoreCourse = (course) =>
  APIV2.get(`api/admin/diem/lopTc/detail/${course}`, course);
export const getAllKHN = () => APIV2.get("/api/admin/keHoachNam");
export const getAllTKBTeacher = (maGv, tuan, maKeHoach) =>
  APIV2.get(
    `/api/admin/tkb/giangVien/${maGv}?tuan=${tuan}&maKeHoach=${maKeHoach}`
  );
export const updateScore = (updateScore) =>
  APIV2.put("/api/admin/diem", updateScore);

export const getCourseTeacherKHM = (maGv, maKeHoach) =>
  // APIV2.post(`api/admin/dsLopTc/giangVien/${maGv}?maKeHoach=${maKeHoach}`);
  APIV2.post(`api/admin/lopTc/giangVien/${maGv}?maKeHoach=${maKeHoach}`);
export const getThongkebysomething = (data) =>
  APIV2.get("api/admin/diem/thong-ke", data);


// import diem by excel (maLopTc)
export const importDiem = (data, maLopTc) =>
APIV2.post(`/api/admin/diem/import/${maLopTc}`, data);

// export diem by excel (maLopTc)
export const exportDiem = (maLopTc) =>
APIV2.get(`/api/admin/diem/export/${maLopTc}`, {
  responseType: "blob",
}); 