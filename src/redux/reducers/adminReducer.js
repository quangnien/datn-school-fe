import {
  ADD_COURSE_DETAIL,
  ADD_COURSE,
  ADD_DEPARTMENT,
  ADD_STUDENT,
  ADD_SUBJECT,
  ADD_TEACHER,
  ADD_UNIT,
  ADMIN_LOGOUT,
  CLEAR_THONGKES,
  DELETE_COURSE,
  DELETE_COURSEDETAIL,
  DELETE_DANGKYMON,
  DELETE_DEPARTMENT,
  DELETE_STUDENT,
  DELETE_SUBJECT,
  DELETE_TEACHER,
  DELETE_UNIT,
  GET_ALL_COURSE_BY_MKH,
  GET_ALL_COURSE_BY_UNIMKH,
  GET_ALL_COURSE_DETAIL,
  GET_ALL_COURSE,
  GET_ALL_DEPARTMENT,
  GET_ALL_KHN,
  GET_ALL_MHTQ,
  GET_ALL_STUDENT,
  GET_ALL_SUBJECT,
  GET_ALL_TEACHER,
  GET_ALL_TKB,
  GET_ALL_UNIT,
  GET_COURSE_BY_KEHOACHNAM,
  GET_COURSE_BY_SOMETHING,
  GET_COURSE_UNIT,
  GET_COURSEDETAIL_COURSE,
  GET_SCORE_COURSE,
  GET_STUDENT_BY_ID,
  GET_STUDENT_UNIT,
  GET_SUBJECT_DEPARTMENT,
  GET_TEACHER_DEPARTMENT,
  GET_THONGKE_BY_SOMETHING,
  GET_UNIT_DEPARTMENT,
  RESET_COURSEDETAILS,
  RESET_COURSES,
  RESET_SCORES,
  RESET_STUDENTS,
  RESET_SUBJECTS,
  RESET_TEACHERS,
  RESET_UNITS,
  UPDATE_COURSE,
  UPDATE_COURSEDETAIL,
  UPDATE_DEPARTMENT,
  UPDATE_PASSWORD,
  UPDATE_SCORE,
  UPDATE_STUDENT,
  UPDATE_SUBJECT,
  UPDATE_TEACHER,
  UPDATE_UNIT,
  GET_ALL_MENU,
  ADD_MENU,
  DELETE_MENU,
  UPDATE_MENU,
  GET_ALL_ROLE,
  ADD_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GET_ALL_USER,
  ADD_USER,
  UPDATE_USER,
  IMPORT_STUDENTS,
  EXPORT_STUDENTS,
  GET_CURRENT_USER,
  ADD_CMMNCD,
  UPDATE_CMMNCD,
  GET_ALL_CMMNCD,
  GET_ALL_CMMNCDSV,
  GET_ALL_CMMNCDGV,
  IMPORT_DIEMS,
  EXPORT_DIEMS,
  DELETE_CMMNCD,
  GET_ALL_CHUYENNGANH,
  ADD_CHUYENNGANH,
  DELETE_CHUYENNGANH,
  UPDATE_CHUYENNGANH,
} from "../actionTypes";

const initialState = {
  authData: null,

  // edit
  updatedDepartment: false,
  updatedChuyenNganh: false,
  updatedMenu: false,
  updatedCmmnCd: false,

  updatedUnit: false,
  updatedSubject: false,
  updatedRole: false,
  updatedUser: false,

  updatedStudent: false,
  updatedTeacher: false,
  updatedCourse: false,
  updateScore: false,
  updatePassworded: false,
  updatedCourseDetail: false,
  studentupwed: false,

  // add
  departmentAdded: false,
  chuyenNganhAdded: false,
  menuAdded: false,
  cmmnCdAdded: false,

  teacherAdded: false,
  studentAdded: false,
  subjectAdded: false,
  roleAdded: false,
  userAdded: false,

  coursedetailAdded: false,
  //getll
  allTeacher: [],
  allSubject: [],
  allRole: [],
  allUser: [],
  allStudent: [],
  allDepartment: [],
  allChuyenNganh: [],
  allCourseDetail: [],
  allTKB: [],
  allKHN: [],
  allMenu: [],
  allCmmnCd: [],
  allCmmnCdSv: [],
  allCmmnCdGv: [],




  //getbyidby~
  students: [],
  teachers: [],
  subjects: [],
  admins: [],
  units: [],
  courses: [],
  scores: [],
  thongkes: [],
  coursedetails: [],
  allMhtq: [],
  currentUser: [],



  //delete
  departmentDeleted: false,
  chuyenNganhDeleted: false,
  menuDeleted: false,
  cmmnCdDeleted: false,
  unitDeleted: false,
  teacherDeleted: false,
  studentDeleted: false,
  subjectDeleted: false,
  roleDeleted: false,
  userDeleted: false,
  courseDeleted: false,
  dangkymonDeleted: false,
  coursedetailDeleted: false,
  importStudents: false,
  exportStudents: false,
  importDiems: false,
  exportDiems: false,

};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGOUT:
      localStorage.removeItem("adminUser");
      return { ...state, authData: action?.data };

    case GET_ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: action.payload,
      };
    case GET_ALL_CHUYENNGANH:
      return {
        ...state,
        allChuyenNganh: action.payload,
      };
    case GET_ALL_MENU:
      return {
        ...state,
        allMenu: action.payload,
      };
    case GET_ALL_CMMNCD:
      return {
        ...state,
        allCmmnCd: action.payload,
      };
    case GET_ALL_CMMNCDSV:
      return {
        ...state,
        allCmmnCdSv: action.payload,
      };
    case GET_ALL_CMMNCDGV:
      return {
        ...state,
        allCmmnCdGv: action.payload,
      };
      
    case ADD_DEPARTMENT:
      return {
        ...state,
        departmentAdded: action.payload,
      };
    case ADD_CHUYENNGANH:
      return {
        ...state,
        chuyenNganhAdded: action.payload,
      };
    case ADD_MENU:
      return {
        ...state,
        menuAdded: action.payload,
      };
    case ADD_CMMNCD:
        return {
          ...state,
          cmmnCdAdded: action.payload,
        };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departmentDeleted: action.payload,
      };
    case DELETE_CHUYENNGANH:
      return {
        ...state,
        chuyenNganhDeleted: action.payload,
      };
    case DELETE_MENU:
      return {
        ...state,
        menuDeleted: action.payload,
      };
    case DELETE_CMMNCD:
      return {
        ...state,
        cmmnCdDeleted: action.payload,
      };
    case GET_TEACHER_DEPARTMENT:
      return {
        ...state,
        teachers: action.payload,
      };
    case GET_ALL_TEACHER:
      return {
        ...state,
        allTeacher: action.payload,
      };
    case ADD_TEACHER:
      return {
        ...state,
        teacherAdded: action.payload,
      };

    case ADD_UNIT:
      return {
        ...state,
        united: action.payload,
      };
    case GET_ALL_UNIT:
      return {
        ...state,
        allUnit: action.payload,
      };
    case GET_STUDENT_UNIT:
      return {
        ...state,
        students: action.payload,
      };

    case GET_ALL_SUBJECT:
      return {
        ...state,
        allSubject: action.payload,
      };
    case GET_ALL_ROLE:
      return {
        ...state,
        allRole: action.payload,
      };
      case GET_ALL_USER:
      return {
        ...state,
        allUser: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        studentAdded: action.payload,
      };

    case ADD_SUBJECT:
      return {
        ...state,
        subjectAdded: action.payload,
      };
    case ADD_ROLE:
      return {
        ...state,
        roleAdded: action.payload,
      };
      case ADD_USER:
      return {
        ...state,
        userAdded: action.payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courseAdded: action.payload,
      };
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        updatedDepartment: action.payload,
      };
    case UPDATE_CHUYENNGANH:
      return {
        ...state,
        updatedChuyenNganh: action.payload,
    };
    case UPDATE_MENU:
      return {
        ...state,
        updatedMenu: action.payload,
      };
    case UPDATE_CMMNCD:
        return {
          ...state,
          updatedCmmnCd: action.payload,
        };
    case GET_UNIT_DEPARTMENT:
      return {
        ...state,
        units: action.payload,
      };
    case GET_ALL_STUDENT:
      return {
        ...state,
        allStudent: action.payload,
      };
    case GET_COURSE_UNIT:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_SCORE_COURSE:
      return {
        ...state,
        scores: action.payload,
      };
    case GET_ALL_COURSE:
      return {
        ...state,
        allCourse: action.payload,
      };
    case UPDATE_UNIT:
      return {
        ...state,
        updatedUnit: action.payload,
      };
      case UPDATE_USER:
      return {
        ...state,
        updatedUser: action.payload,
      };
    case UPDATE_SUBJECT:
      return {
        ...state,
        updatedSubject: action.payload,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        updatedRole: action.payload,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        updatedStudent: action.payload,
      };

    case GET_STUDENT_BY_ID:
      return {
        ...state,
        students: action.payload,
      };
    case UPDATE_TEACHER:
      return {
        ...state,
        updatedTeacher: action.payload,
      };
    case GET_ALL_TKB:
      return {
        ...state,
        allTKB: action.payload,
      };
    case ADD_COURSE_DETAIL:
      return {
        ...state,
        coursedetailAdded: action.payload,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        updatedCourse: action.payload,
      };
    case GET_ALL_COURSE_DETAIL:
      return {
        ...state,
        allCourseDetail: action.payload,
      };

    case DELETE_UNIT:
      return {
        ...state,
        unitDeleted: action.payload,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        studentDeleted: action.payload,
      };
    case DELETE_TEACHER:
      return {
        ...state,
        teacherDeleted: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courseDeleted: action.payload,
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjectDeleted: action.payload,
      };
    case DELETE_ROLE:
      return {
        ...state,
        roleDeleted: action.payload,
      };
    case DELETE_DANGKYMON:
      return {
        ...state,
        dangkymonDeleted: action.payload,
      };

    case UPDATE_SCORE:
      return {
        ...state,
        updateScore: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatePassworded: action.payload,
      };

    case GET_SUBJECT_DEPARTMENT:
      return {
        ...state,
        subjects: action.payload,
      };
    case GET_COURSE_BY_KEHOACHNAM:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_THONGKE_BY_SOMETHING:
      return {
        ...state,
        thongkes: action.payload,
      };
    //  mã lớp với mã kế hoạch á
    case GET_COURSE_BY_SOMETHING:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_ALL_COURSE_BY_MKH:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_ALL_COURSE_BY_UNIMKH:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_COURSEDETAIL_COURSE:
      return {
        ...state,
        coursedetails: action.payload,
      };
    case UPDATE_COURSEDETAIL:
      return {
        ...state,
        updatedCourseDetail: action.payload,
      };
    case DELETE_COURSEDETAIL:
      return {
        ...state,
        coursedetailDeleted: action.payload,
      };
    case CLEAR_THONGKES:
      return {
        ...state,
        thongkes: [],
      };
    case RESET_STUDENTS:
      return {
        ...state,
        students: [],
      };
    case RESET_TEACHERS:
      return {
        ...state,
        teachers: [],
      };
    case RESET_SUBJECTS:
      return {
        ...state,
        subjects: [],
      };
    case RESET_COURSEDETAILS:
      return {
        ...state,
        coursedetails: [],
      };
    case RESET_SCORES:
      return {
        ...state,
        scores: [],
      };

    case GET_ALL_KHN:
      return {
        ...state,
        allKHN: action.payload,
      };
    case RESET_COURSES:
      return {
        ...state,
        courses: [],
      };
    case RESET_UNITS:
      return {
        ...state,
        units: [],
      };
    case GET_ALL_MHTQ:
      return {
        ...state,
        allMhtq: action.payload,
      };

      case IMPORT_STUDENTS:
        return {
          ...state,
          importStudents: action.payload,
        };
      case EXPORT_STUDENTS:
        return {
          ...state,
          exportStudents: action.payload,
        }; 
      case GET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.payload,
        };
      case IMPORT_DIEMS:
        return {
          ...state,
          importDiems: action.payload,
        };
        case EXPORT_DIEMS:
          return {
            ...state,
            exportDiems: action.payload,
          };  
    default:
      return state;
  }
};

export default adminReducer;
