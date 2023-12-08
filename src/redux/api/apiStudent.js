import axios from "axios";

// const APIV3 = axios.create({ baseURL: "http://localhost:9090/" });
const APIV3 = axios.create({ baseURL: "http://localhost:8080/" });

APIV3.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).retObj.jwt
    }`;
  }
  return req;
});

export const getAllUnitStudent = () => APIV3.get("/api/admin/lop");
export const dangKymonStudent = (data) =>
  APIV3.post("api/admin/dang-ky-mon", data);
export const studentUpwStudent = (updatePassword) =>
  APIV3.put("/api/admin/updatePassword", updatePassword);

// lớp and mã kế hoạch
export const getAllCoursebysomethingStudent = (data) =>
  // APIV3.get("api/admin/dsLopTc", data);
  APIV3.get("api/admin/lopTc", data);

export const getStudentByIdStudent = (id) =>
  APIV3.get(`/api/admin/sinhVien/${id}`, id);

export const getScoreStudent = (maSv, maKeHoach) =>
  APIV3.post(`api/admin/diem/${maSv}?maKeHoach=${maKeHoach}`);
export const getAllDsLtcSinhVien = (maSv) =>
  // APIV3.get(`/api/admin/dsLopTc/sinhVien?maSv=${maSv}`, maSv);
  APIV3.get(`/api/admin/lopTc/sinhVien?maSv=${maSv}`, maSv);
export const deleteDkmStudent = (data) =>
  APIV3.delete("api/admin/dang-ky-mon", { data });

export const getAllTKBStudent = (maSv, tuan, maKeHoach) =>
  APIV3.get(
    `/api/admin/tkb/sinhVien/${maSv}?tuan=${tuan}&maKeHoach=${maKeHoach}`
  );
export const getAllKHNStudent = () => APIV3.get("/api/admin/keHoachNam");
export const getScoreStudent1Student = (maSV) =>
  APIV3.post(`/api/admin/diem/${maSV}?maKeHoach=MKH1`);
export const getScoreStudent0Student = (maSV) =>
  APIV3.post(`/api/admin/diem/${maSV}?maKeHoach=MKH0`);
