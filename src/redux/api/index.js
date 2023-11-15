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

//2. teacher

export const getTeacherDepartment = (department, page, size) =>
  API.get(`/api/admin/giangVien/khoa/${department}?page=${page}&size=${size}`);
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

export const getUnitDepartment = (department) =>
  API.get(`/api/admin/lop/khoa/${department}`, department);
export const updateUnit = (updateUnit) => API.put("/api/admin/lop", updateUnit);
export const deleteUnit = (data) => API.delete("api/admin/lop", { data });

// môn học
export const getAllSubject = () => API.get("/api/admin/monHoc");
export const addSubject = (subject) => API.post("/api/admin/monHoc", subject);
export const updateSubject = (updateSubject) =>
  API.put("/api/admin/monHoc", updateSubject);
export const deleteSubject = (data) => API.delete("api/admin/monHoc", { data });

export const getSubjectDepartment = (department, page, size) =>
  API.get(`/api/admin/monHoc/khoa/${department}?page=${page}&size=${size}`);

//sinh viên
export const getAllStudent = () => API.get("/api/admin/sinhVien");
export const addStudent = (student) => API.post("/api/admin/sinhVien", student);
export const getStudentUnit = (unit, page, size) =>
  API.get(`/api/admin/sinhVien/lop/${unit}?page=${page}&size=${size}`);

export const updateStudent = (updateStudent) =>
  API.put("/api/admin/sinhVien", updateStudent);
export const getStudentById = (id) => API.get(`/api/admin/sinhVien/${id}`, id);
export const deleteStudent = (data) =>
  API.delete("api/admin/sinhVien", { data });

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
export const addMenu = (menu) => API.post("/api/admin/menu", menu);
export const updateMenu = (updateMenu) =>
  API.put("/api/admin/menu", updateMenu);
export const deleteMenu = (data) => API.delete("/api/admin/menu", { data });

// role

// môn học
export const getAllRole = () => API.get("/api/admin/role");
export const addRole = (tole) => API.post("/api/admin/role", tole);
export const updateRole = (updateRole) =>
  API.put("/api/admin/role", updateRole);
export const deleteRole = (data) => API.delete("api/admin/role", { data });
