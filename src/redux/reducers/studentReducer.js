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
  RESET_COURSES,
  RESET_COURSESDKMEDS,
  RESET_STUDENT_AVATAR,
  RESET_TKBS,
  STUDENT_LOGOUT,
  STUDENT_UPW,
} from "../actionTypes";

const initialState = {
  authData: null,
  allUnit: [],
  dangkymonAdded: false,
  deleteDkmed: false,
  courses: [],
  coursesdkmeds: [],
  students: [],
  scores: [],
  scores1: [],
  scores0: [],
  studenttkbs: [],
  khns: [],
  studentupwed: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOGOUT:
      localStorage.removeItem("studentUser");
      return { ...state, authData: action?.data };
    case GET_ALL_UNIT:
      return {
        ...state,
        allUnit: action.payload,
      };
    //  mã lớp với mã kế hoạch á
    case GET_COURSE_BY_SOMETHING:
      return {
        ...state,
        courses: action.payload,
      };
    case ADD_DANG_KY_MON:
      return {
        ...state,
        dangkymonAdded: action.payload,
      };
    case GET_STUDENT_BY_ID:
      return {
        ...state,
        students: action.payload,
      };
    case GET_ALL_SCORE_STUDENT:
      return {
        ...state,
        scores: action.payload,
      };
    case GET_ALL_DSLOPTC_SV:
      return {
        ...state,
        coursesdkmeds: action.payload,
      };
    case RESET_COURSES:
      return {
        ...state,
        courses: [],
      };
    case RESET_COURSESDKMEDS:
      return {
        ...state,
        coursesdkmeds: [],
      };
    case DELETE_DKM:
      return {
        ...state,
        deleteDkmed: action.payload,
      };
    case GET_TKB_STUDENT:
      return {
        ...state,
        studenttkbs: action.payload,
      };
    case GET_ALL_KHN:
      return {
        ...state,
        khns: action.payload,
      };
    case RESET_TKBS:
      return {
        ...state,
        studenttkbs: [],
      };
    case RESET_STUDENT_AVATAR:
      return {
        ...state,
        students: [],
      };
    case STUDENT_UPW:
      return {
        ...state,
        studentupwed: action.payload,
      };
    case GET_ALL_SCORE_STUDENT1:
      return {
        ...state,
        scores1: action.payload,
      };
    case GET_ALL_SCORE_STUDENT0:
      return {
        ...state,
        scores0: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
