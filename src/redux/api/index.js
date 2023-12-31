import { API } from "../config/config";

// export const userLogin = (formData) => API.post("/api/auth/signin", formData);
export const userLogin = (formData) => API.post("/sys/auth/signin", formData);
// 1. Khoa
export const getAllDepartment = () => API.get("/api/admin/khoa");
export const addDepartment = (department) =>
  API.post("/api/admin/khoa", department);
export const updateDepartment = (updateDepartment) =>
  API.put("/api/admin/khoa", updateDepartment);
export const deleteDepartment = (data) =>
  API.delete("/api/admin/khoa", { data });

// chuyen nganh
export const getAllChuyenNganh = () => API.get("/api/admin/chuyenNganh");
export const addChuyenNganh = (chuyennganh) =>
  API.post("/api/admin/chuyenNganh", chuyennganh);
export const updateChuyenNganh = (updateChuyenNganh) =>
  API.put("/api/admin/chuyenNganh", updateChuyenNganh);
export const deleteChuyenNganh = (data) =>
  API.delete("/api/admin/chuyenNganh", { data });

//2. teacher

export const getTeacherDepartment = (department, page, size) =>
  // API.get(`/api/admin/giangVien/khoa/${department}?page=${page}&size=${size}`);
  API.get(`/api/admin/giangVien/khoa/${department}?page=0&size=1000`);
export const getAllTeacher = (data) => API.get("/api/admin/giangVien", data);
export const addTeacher = (teacher) =>
  API.post("/api/admin/giangVien", teacher);
export const updateTeacher = (updateTeacher) =>
  API.put("/api/admin/giangVien", updateTeacher);
export const getTeacherById = (id) => API.get(`/api/admin/giangVien/${id}`, id);
export const deleteTeacher = (data) =>
  API.delete("api/admin/giangVien", { data });

//Lớp

export const addUnit = (unit) => API.post("/api/admin/lop", unit);
export const getAllUnit = () => API.get("/api/admin/lop");

export const getUnitChuyenNganh = (chuyennganh) =>
  API.get(`/api/admin/lop/chuyenNganh/${chuyennganh}`, chuyennganh);
export const updateUnit = (updateUnit) => API.put("/api/admin/lop", updateUnit);
export const deleteUnit = (data) => API.delete("api/admin/lop", { data });

// môn học
export const getAllSubject = () => API.get("/api/admin/monHoc");
export const addSubject = (subject) => API.post("/api/admin/monHoc", subject);
export const updateSubject = (updateSubject) =>
  API.put("/api/admin/monHoc", updateSubject);
export const deleteSubject = (data) => API.delete("api/admin/monHoc", { data });

export const getSubjectDepartment = (department, page, size) =>
  // API.get(`/api/admin/monHoc/khoa/${department}?page=${page}&size=${size}`);
  API.get(`/api/admin/monHoc/khoa/${department}?page=0&size=1000`);

//sinh viên
export const getAllStudent = () => API.get("/api/admin/sinhVien");
export const addStudent = (student) => API.post("/api/admin/sinhVien", student);
export const getStudentUnit = (unit, page, size) =>
  // API.get(`/api/admin/sinhVien/lop/${unit}?page=${page}&size=${size}`);
  API.get(`/api/admin/sinhVien/lop/${unit}?page=0&size=1000`);

export const updateStudent = (updateStudent) =>
  API.put("/api/admin/sinhVien", updateStudent);
export const getStudentById = (id) => API.get(`/api/admin/sinhVien/${id}`, id);
export const deleteStudent = (data) =>
  API.delete("api/admin/sinhVien", { data });

// import by excel
export const importStudent = (data, unit) =>
  API.post(`api/admin/sinhVien/import/${unit}`, data);

// export
export const exportStudent = (unit) =>
  API.get(`/api/admin/sinhVien/export/${unit}`, {
    responseType: "blob",
  });

//lớp tín chỉ
// export const addCourse = (course) => API.post("/api/admin/dsLopTc", course);
export const addCourse = (course) => API.post("/api/admin/lopTc", course);
// export const getAllCourse = () => API.get("/api/admin/dsLopTc");
export const getAllCourse = () => API.get("/api/admin/lopTc");
export const updateCourse = (updateCourse) =>
  // API.put("/api/admin/dsLopTc", updateCourse);
  API.put("/api/admin/lopTc", updateCourse);
// export const deleteCourse = (data) => API.delete("api/admin/dsLopTc", { data });
export const deleteCourse = (data) => API.delete("api/admin/lopTc", { data });
// không truyền gì hết sẽ lấy ra lớp tín chỉ của kỳ mới nhất
export const getCourseUnit = (unit) =>
  // API.get(`/api/admin/dsLopTc/lop/${unit}`, unit);
  API.get(`/api/admin/lopTc/lop/${unit}`, unit);

export const getAllCoursebysomething = (data) =>
  // API.get("api/admin/dsLopTc", data);
  API.get("api/admin/lopTc", data);

// export const getAllCoursebyMKH = (data) => API.get("api/admin/dsLopTc", data);
export const getAllCoursebyMKH = (data) => API.get("api/admin/lopTc", data);
export const getAllCoursebyUnitMKH = (data) =>
  // API.get("api/admin/dsLopTc", data);
  API.get("api/admin/lopTc", data);

// get sinh vien chưa đăng ký lớp tín chỉ
export const getStudentChuaDangKy = (data) =>
  API.get(`api/admin/sinhVien/chuaDK`, data);

// get sinh viên đã đăng ký lớp tính chỉ bởi quản trị viên
export const getStudentDaDangKyBoiAdmin = (data) =>
  API.get(`api/admin/sinhVien/daDKByAdmin`, data);

export const updateDangKyMon = (updateDangKyMon) =>
  API.put("/api/admin/dang-ky-mon/adminDKM", updateDangKyMon);
//Điểm
export const getScoreCourse = (course) =>
  API.get(`/api/admin/diem/lopTc/detail/${course}`, course);

export const updateScore = (updateScore) =>
  API.put("/api/admin/diem", updateScore);

// chi tiết lớp tín chỉ
export const addCourseDetail = (coursedetail) =>
  API.post("/api/admin/chiTietLopTc", coursedetail);
export const getAllCourseDetail = () => API.get("/api/admin/chiTietLopTc");
export const updateCourseDetail = (updateCourseDetail) =>
  API.put("/api/admin/chiTietLopTc", updateCourseDetail);
export const deleteCourseDetail = (data) =>
  API.delete("api/admin/chiTietLopTc", { data });

//
export const addCheckCourseDetail = (coursedetail) =>
  API.post("/api/admin/chiTietLopTc/validate", coursedetail);

export const getAllCourseDetailCourse = (course) =>
  API.get(`api/admin/chiTietLopTc/lopTc/${course}`, course);
// đăng ký môn
export const deleteDangkymon = (data) =>
  API.delete("api/admin/dang-ky-mon", { data });

// đổi mật khẩu
export const updatePassword = (updatePassword) =>
  API.put("/api/admin/updatePassword", updatePassword);

// thống kê
export const getCoursebyKeHoachNam = (data) =>
  API.get("api/admin/search/thong-ke", data);
export const getThongkebysomething = (data) =>
  API.get("api/admin/diem/thong-ke", data);
// kế hoạch năm
export const getAllKHN = () => API.get("/api/admin/keHoachNam");
// môn học tiên quyết
export const getMhtq = () => API.get("/api/admin/mhtq");

// Menu
export const getAllMenu = () => API.get("/api/admin/menu");
export const getAllDayOfDow = () => API.get("/api/admin/dayOfWeek");

export const addMenu = (menu) => API.post("/api/admin/menu", menu);
export const updateMenu = (updateMenu) =>
  API.put("/api/admin/menu", updateMenu);
export const deleteMenu = (data) => API.delete("/api/admin/menu", { data });

// role
export const getAllRole = () => API.get("/api/admin/role");

export const addRole = (tole) => API.post("/api/admin/role", tole);
// gvdow
export const updateGvDow = (gvDow) =>
  API.put("/api/admin/giangVien/dow", gvDow);
export const getAllGvDow = () => API.get("/api/admin/giangVien/dow");

export const updateRole = (updateRole) =>
  API.put("/api/admin/role", updateRole);
export const deleteRole = (data) => API.delete("api/admin/role", { data });

// user
export const getAllUser = () => API.get("/api/admin/user");
export const addUser = (user) => API.post("/api/admin/user", user);
export const updateUser = (updateUser) =>
  API.put("/api/admin/user", updateUser);
export const deleteUser = (data) => API.delete("api/admin/user", { data });
export const getCurrentUser = () => API.get("api/admin/user/current");

export const getAllCmmnCd = () => API.get("/api/admin/cmmnCd");
export const getAllCmmnCdSv = () => API.get("/api/admin/cmmnCd/sv");
export const getAllCmmnCdGv = () => API.get("/api/admin/cmmnCd/gv");
export const addCmmnCd = (cmmnCd) => API.post("/api/admin/cmmnCd", cmmnCd);
export const updateCmmnCd = (updateCmmnCd) =>
  API.put("/api/admin/cmmnCd", updateCmmnCd);
export const deleteCmmnCd = (data) => API.delete("/api/admin/cmmnCd", { data });

// import diem by excel (maLopTc)
export const importDiem = (data, maLopTc) =>
  API.post(`/api/admin/diem/import/${maLopTc}`, data);

// export diem by excel (maLopTc)
export const exportDiem = (maLopTc) =>
  API.get(`/api/admin/diem/export/${maLopTc}`, {
    responseType: "blob",
  });
