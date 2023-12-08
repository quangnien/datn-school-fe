// import { LOGIN } from "../actionTypes";

// const initialState = {
//   // studentData: JSON.parse(localStorage.getItem("studentUser")) || null,
//   adminData: JSON.parse(localStorage.getItem("user")) || null,
//   teacherData: JSON.parse(localStorage.getItem("teacherUser")) || null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN:
//       const { role } = action.data;
//       switch (role) {
//         // case "ROLE_SINHVIEN":
//         //   localStorage.setItem("studentUser", JSON.stringify(action.data));
//         //   return {
//         //     ...state,
//         //     studentData: action.data,
//         //   };
//         case "USER":
//           localStorage.setItem("user", JSON.stringify(action.data));
//           return {
//             ...state,
//             user: action.data,
//           };
//         case "ROLE_GIANGVIEN":
//           localStorage.setItem("teacherUser", JSON.stringify(action.data));
//           return {
//             ...state,
//             teacherData: action.data,
//           };
//         default:
//           return state;
//       }

//     default:
//       return state;
//   }
// };

// export default authReducer;

import { LOGIN } from "../actionTypes";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        userData: action.data,
      };

    default:
      return state;
  }
};

export default authReducer;
