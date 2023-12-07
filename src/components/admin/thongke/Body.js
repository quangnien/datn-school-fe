import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import {
  getAllCoursebyMKH,
  getCoursebyKeHoachNam,
  getThongkebysomething,
} from "../../../redux/actions/adminActions";

const modalStyles = {
  content: {
    top: "50%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};
const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const khns = useSelector((state) => state.admin.allKHN);
  const [unit, setUnit] = useState("");
  const units = useSelector((state) => state.admin.allUnit);
  const [course, setCourse] = useState("");

  // bỏ cách code cũ
  // const [value, setValue] = useState({
  //   idKeHoachNam: "",
  //   maLop: "",
  //   keySearch: "",
  // });

  // const [initialKeySearch, setInitialKeySearch] = useState("");

  // useEffect(() => {
  //   if (Object.keys(store.errors).length !== 0) {
  //     setError(store.errors);
  //     setLoading(false);
  //   }
  // }, [store.errors]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError({});
  //   setInitialKeySearch(value.keySearch);
  //   const UnitObj = units?.find((dp) => dp.tenLop === unit);
  //   if (!UnitObj) return;
  //   const UnitId = UnitObj?.maLop;
  //   dispatch(
  //     getCoursebyKeHoachNam({
  //       params: {
  //         ...value,
  //         maLop: UnitId,
  //       },
  //     })
  //   );
  // };

  // useEffect(() => {
  //   if (!value.idKeHoachNam || !value.keySearch) return;
  //   dispatch(
  //     getCoursebyKeHoachNam({
  //       params: {
  //         ...value,
  //       },
  //     })
  //   );
  // }, [dispatch, store.errors]);

  // useEffect(() => {
  //   dispatch({ type: SET_ERRORS, payload: {} });
  // }, []);

  // const courses = useSelector((state) => state.admin.courses);

  // useEffect(() => {
  //   if (courses?.length !== 0 || courses?.length === 0) {
  //     setLoading(false);
  //   }
  // }, [courses]);

  // useEffect(() => {
  //   dispatch({ type: SET_ERRORS, payload: {} });
  // }, []);

  // useEffect(() => {
  //   if (!initialKeySearch && !value?.idKeHoachNam)
  //     dispatch({ type: "RESET_COURSES" });
  // }, [initialKeySearch, value?.idKeHoachNam]);

  // cách code mới
  const [valueMKH, setValueMKH] = useState({ maKeHoach: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    const UnitObj = units?.find((dp) => dp.tenLop === unit);
    if (!UnitObj) return;
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebyMKH({
        params: {
          maKeHoach: valueMKH?.maKeHoach,
          maLop: UnitId,
        },
      })
    );
  };

  const courses = useSelector((state) => state.admin.courses);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (!unit) dispatch({ type: "RESET_COURSES" });
  }, [unit]);

  useEffect(() => {
    if (!course) dispatch({ type: "RESET_SCORES" });
  }, [course]);

  //// modal
  const [selectedThongke, setSelectedThongke] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [valuethongke, setValuethongke] = useState({
    idLopTc: "",
    col: "CC",
  });
  console.log("valuethongke", valuethongke);
  const handleOpenViewModal = (course) => {
    setSelectedThongke(course);
    setIsModalOpen(true);
    setModalMode("view");
    setValuethongke({
      ...valuethongke,
      idLopTc: course.id,
    });
  };

  // http://localhost:9090/api/admin/diem/thong-ke?idLopTc=da6c6f34&col=XEPLOAI
  const [loadingthongke, setLoadingthongke] = useState(false);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setLoadingthongke(false);
    }
  }, [store.errors]);

  useEffect(() => {
    setValuethongke({
      ...valuethongke,
      col: "CC",
    });
  }, [valuethongke?.idLopTc]);

  // const handleSubmitThongke = (e) => {
  //   e.preventDefault();
  //   setLoadingthongke(true);
  //   dispatch(
  //     getThongkebysomething({
  //       params: {
  //         ...valuethongke,
  //       },
  //     })
  //   );
  // };

  useEffect(() => {
    if (valuethongke?.idLopTc && valuethongke?.col) {
      setLoadingthongke(true);
      dispatch(
        getThongkebysomething({
          params: {
            ...valuethongke,
          },
        })
      );
    }
  }, [valuethongke?.idLopTc, valuethongke?.col]);

  const thongkes = useSelector((state) => state.admin.thongkes);

  useEffect(() => {
    if (thongkes?.length !== 0 || thongkes?.length === 0) {
      setLoadingthongke(false);
    }
  }, [thongkes]);

  const handelReset = () => {
    setIsModalOpen(false);
    setLoading(false);
    setError({});
    setValuethongke("");
    dispatch({ type: "CLEAR_THONGKES" });
  };
  // useEffect(() => {
  //   getCoursebyKeHoachNam({
  //     params: {
  //       idKeHoachNam: value.idKeHoachNam,
  //       keySearch: initialKeySearch,
  //     },
  //   });
  // }, [dispatch, store.errors, store.admin.thongkes]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="mt-2">
        <form className="" onSubmit={handleSubmit}>
          <div className="flex mt-2 gap-x-2">
            <div className="flex flex-col">
              <span className="mb-1 text-text2">
                Chọn học kỳ xem thống kê điểm *:
              </span>

              <Select
                displayEmpty
                sx={{ height: 36, width: 274 }}
                inputProps={{ "aria-label": "Without label" }}
                value={valueMKH.maKeHoach}
                onChange={(e) =>
                  setValueMKH({ ...valueMKH, maKeHoach: e.target.value })
                }
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none w-[200px] mr-3"
              >
                <MenuItem value="">Chưa chọn</MenuItem>
                {khns?.map((khn, idx) => (
                  <MenuItem key={idx} value={khn.maKeHoach}>
                    {`Học kỳ ${khn.ky} - Năm học ${khn.nam}-2024`}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {/* thêm lớp  */}
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Lớp *:</span>

              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 296 }}
                inputProps={{ "aria-label": "Without label" }}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
              >
                <MenuItem value="">Chưa chọn</MenuItem>
                {units?.map((ut, idx) => (
                  <MenuItem key={idx} value={ut.tenLop}>
                    {ut.tenLop}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* <div className="flex flex-col">
              <h1 className="mb-1 text-text2">Tìm môn học:</h1>
              <input
                placeholder="Tên môn học"
                className="w-[284px] h-10 py-2 px-3 bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm"
                type="text"
                value={value.keySearch}
                onChange={(e) =>
                  setValue({ ...value, keySearch: e.target.value })
                }
              />
            </div> */}

            <button
              className="w-56 mt-auto text-white transition-all duration-200 bg-red-500 rounded-md h-9 hover:scale-105 hover:bg-red-700"
              type="submit"
            >
              Lọc
            </button>
          </div>
        </form>
      </div>

      <div className="w-full">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && courses?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}

            {courses?.length < 0 && (
              <p className="text-2xl font-bold text-red-500">
                Chưa có lớp tín chỉ nào trong kế hoạch năm này!
              </p>
            )}
          </div>

          {!loading && courses?.length > 0 && (
            <div className="overflow-auto max-h-[500px]">
              <table className="w-full table-auto">
                <thead className="sticky top-0 bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">Mã Lớp Tín Chỉ</th>
                    <th className="px-4 py-1">Số lượng</th>
                    <th className="px-4 py-1">Số lượng còn</th>
                    <th className="px-4 py-1">Tên môn học</th>
                    <th className="px-4 py-1">Tên giảng viên</th>
                    <th className="px-4 py-1">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {courses?.map((course, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-1 border text-center">{idx + 1}</td>
                      <td className="px-4 py-1 border text-left">{course.maLopTc}</td>
                      <td className="px-4 py-1 border text-center">{course.soLuong}</td>
                      <td className="px-4 py-1 border text-center">{course.soLuongCon}</td>
                      <td className="px-4 py-1 border text-left">{course.tenMh}</td>
                      <td className="px-4 py-1 border text-left">{course.tenGv}</td>

                      <td className="items-center justify-center px-4 py-1 mr-0 border">
                        <button
                          className="px-3 py-[0.6] mr-5 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572]  focus:outline-none focus:shadow-outline"
                          onClick={() => handleOpenViewModal(course)}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {modalMode === "view" && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex-[0.8] mt-3 mx-5 item-center w-[1000px] h-[650px] ">
            <div className="flex items-center justify-end gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handelReset()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <div className="text-xl font-medium text-text1">
                Thông tin lớp tín chỉ:
              </div>
              <div className="text-lg font-semibold text-text1">
                Môn học: {"   "}
                <span className="text-base font-normal text-text2">
                  {selectedThongke.tenMh}
                </span>
              </div>
              <div className="text-lg font-semibold text-text1">
                Mã lớp tín chỉ: {"  "}{" "}
                <span className="text-base font-normal text-text2">
                  {selectedThongke.maLopTc}
                </span>
              </div>
              <div className="text-lg font-semibold text-text1">
                Tên giảng viên: {"  "}{" "}
                <span className="text-base font-normal text-text2">
                  {" "}
                  {selectedThongke.tenGv}
                </span>
              </div>
              <div className="text-lg font-semibold text-text1">
                lớp: {"  "}{" "}
                <span className="text-base font-normal text-text2">
                  {" "}
                  {selectedThongke.maLop}
                </span>
              </div>
            </div>
            <div className="items-center my-8 mt-2 mb-2 rounded-lg">
              <form
                className="flex flex-col col-span-1 space-y-2"
                // onSubmit={handleSubmitThongke}
              >
                <label htmlFor="department">Biểu đồ Thống kê theo: </label>

                <div className="flex">
                  <div>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36, width: 274 }}
                      inputProps={{ "aria-label": "Without label" }}
                      value={valuethongke.col}
                      onChange={(e) =>
                        setValuethongke({
                          ...valuethongke,
                          col: e.target.value,
                        })
                      }
                      className={`${classes.InputStyle} hover:focus:border-none w-[166px] text-center `}
                    >
                      <MenuItem value="CC">Chuyên cần</MenuItem>
                      <MenuItem value="GK">Giữa kỳ</MenuItem>
                      <MenuItem value="CK">Cuối kỳ</MenuItem>
                      <MenuItem value="TB">Trung bình</MenuItem>
                      <MenuItem value="XEPLOAI">Xếp loại</MenuItem>
                    </Select>
                  </div>
                </div>
              </form>
            </div>
            <div className={classes.loadingAndError}>
              {loadingthongke && thongkes?.length !== 0 && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
            </div>
            {!loadingthongke && thongkes.length > 0 && (
              <div className="flex-[0.8] mt-10 mx-5 item-center">
                <BarChart width={800} height={300} data={thongkes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis
                    label={{
                      value: "Số lượng",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Legend />

                  <Bar
                    dataKey="soLuong"
                    fill="#8884d8"
                    barSize={30}
                    label={{
                      position: "top",
                    }}
                  />
                </BarChart>
                <div
                  className="text-text2"
                  style={{
                    position: "absolute",
                    bottom: "29px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginLeft: "20%",
                  }}
                >
                  {`Biểu đồ thống kê điểm lớp tín chỉ theo điểm ${
                    valuethongke?.col === "CC"
                      ? "Chuyên Cần"
                      : valuethongke?.col === "GK"
                      ? "Giữa Kỳ"
                      : valuethongke?.col === "CK"
                      ? "Cuối Kỳ"
                      : valuethongke?.col === "TB"
                      ? "Trung Bình"
                      : valuethongke?.col === "XEPLOAI"
                      ? "Xếp Loại"
                      : ""
                  }`}
                </div>
              </div>
            )}
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Body;
