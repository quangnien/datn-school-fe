import { IMPORT_DIEMS, SET_ERRORS, UPDATE_SCORE } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import { exportDiem, getAllCoursebyMKH, getScoreCourse, importDiem, updateScore } from "../../../redux/actions/adminActions";
import { useRef } from "react";
// http://localhost:9090/api/admin/diem/lopTc/detail/CNTT1
const modalStyles = {
    content: {
        top: "45%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "0",
        border: "none",
    },
};

const Body = () => {
    const dispatch = useDispatch();
    const [course, setCourse] = useState("");

    const [error, setError] = useState({});
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState("");
    const [valueMKH, setValueMKH] = useState({ maKeHoach: "" });

    const store = useSelector((state) => state);
    console.log("store", store);
    const units = useSelector((state) => state.admin.allUnit);
    const khns = useSelector((state) => state.admin.allKHN);

    useEffect(() => {
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
    }, [valueMKH, unit]);

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
    useEffect(() => {
        dispatch({ type: "RESET_SCORES" });
    }, [valueMKH?.maKeHoach]);
    // SORT
    const [sortType, setSortType] = useState("tenSv");
    const scores = useSelector((state) => state.admin.scores.retObj);
    const [sortedScores, setSortedScores] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSortType(value);
    };

    const sortScores = (scoresToSort) => {
        const sortedScores = [...scoresToSort];
        switch (sortType) {
            case "tenSv":
                sortedScores.sort((a, b) => {
                    const lastNameA = a.tenSv.split(" ").pop();
                    const lastNameB = b.tenSv.split(" ").pop();
                    return lastNameA.localeCompare(lastNameB);
                });
                break;
            case "maSv":
                sortedScores.sort((a, b) => a.maSv.localeCompare(b.maSv));
                break;
            default:
                break;
        }
        return sortedScores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(true);
        setLoading(true);
        setError({});
        const CourseObj = courses?.find((dp) => dp.maLopTc === course);
        const CourseId = CourseObj?.maLopTc;

        dispatch(getScoreCourse(CourseId));
    };

    useEffect(() => {
        if (scores) {
            const newSortedScores = sortScores(scores);
            setSortedScores(newSortedScores);
        }
    }, [sortType, scores]);

    useEffect(() => {
        if (scores?.length !== 0 || scores?.length === 0) {
            setLoading(false);
        }
    }, [scores]);

    useEffect(() => {
        dispatch({ type: SET_ERRORS, payload: {} });
    }, []);

    //Begin edit
    const [value, setValue] = useState({
        id: "",
        cc: "",
        gk: "",
        ck: "",
        maSv: "",
        maLopTc: "",
    });
    const [selectedScore, setSelectedScore] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleEditClick = (score) => {
        setSelectedScore(score);
        setIsModalOpen(true);
        setValue({
            id: score.id,
            cc: "",
            gk: "",
            ck: "",
            maSv: score.maSv,
            maLopTc: score.maLopTc,
        });
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedValue = {};

        if (value.cc !== "") {
            updatedValue.cc = value.cc;
        } else {
            updatedValue.cc = selectedScore.cc;
        }
        if (value.gk !== "") {
            updatedValue.gk = value.gk;
        } else {
            updatedValue.gk = selectedScore.gk;
        }
        if (value.ck !== "") {
            updatedValue.ck = value.ck;
        } else {
            updatedValue.ck = selectedScore.ck;
        }

        dispatch(updateScore({ ...selectedScore, ...updatedValue }));
        dispatch({ type: UPDATE_SCORE, payload: false });
        closeModal();
    };

    useEffect(() => {
        if (store.admin.updateScore) {
            dispatch(getScoreCourse(selectedScore.maLopTc));
        }
    }, [dispatch, store.errors, store.admin.updateScore]);

    // End edit

    // handle import, export
    const [file, setFile] = useState(null);
    console.log("file", file);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleImportFile = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        dispatch(importDiem(formData, course));
        dispatch({ type: IMPORT_DIEMS, payload: false });
    };

    const handleExport = (e) => {
        e.preventDefault();

        dispatch(exportDiem(course));
    };
    const inputRef = useRef(null);
    useEffect(() => {
        if (store.admin.importDiems) {
            console.log("runing app....");
            const CourseObj = courses?.find((dp) => dp.maLopTc === course);
            const CourseId = CourseObj?.maLopTc;
            dispatch(getScoreCourse(CourseId));
            setFile(null);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [dispatch, store.errors, store.admin.importDiems]);

    // cách tính điểm
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    const items = [
        "F - 0 (0 đến 3.9)",
        "D - 1 (4 đến 4.9)",
        "D+ - 1.5 (5 đến 5.4)",
        "C - 2 (5.5 đến 6.4)",
        "C+ - 2.5 (6.5 đến 6.9)",
        "B - 3 (7 đến 7.9)",
        "B+ - 3.5 (8 đến 8.4)",
        "A - 3.7 (8.5 đến 8.9)",
        "A+ - 4 (9 đến 10 )",
    ];

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };
    return (
        <div className="flex-[0.8] mt-1 mx-5 item-center">
            <div className="items-center my-2 mt-1 mb-1 rounded-lg">
                <form className="flex flex-col col-span-1 space-y-2" onSubmit={handleSubmit}>
                    <div className="flex mt-2 gap-x-2">
                        <div className="flex flex-col">
                            <span className="mb-1 text-text2">Chọn học kỳ xem điểm *:</span>

                            <Select
                                displayEmpty
                                sx={{ height: 36, width: 274 }}
                                inputProps={{ "aria-label": "Without label" }}
                                value={valueMKH.maKeHoach}
                                onChange={(e) => setValueMKH({ ...valueMKH, maKeHoach: e.target.value })}
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

                        <div className="flex flex-col">
                            <span className="mb-1 text-text2">Lớp tín chỉ *:</span>

                            <Select
                                required
                                displayEmpty
                                sx={{ height: 36, width: 324 }}
                                inputProps={{ "aria-label": "Without label" }}
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
                                SelectDisplayProps={{ sx: { overflow: "auto" } }}
                            >
                                <MenuItem value="">Chưa chọn</MenuItem>

                                {courses && courses.length > 0 ? (
                                    courses.map((ut, idx) => (
                                        <MenuItem key={idx} value={ut.maLopTc}>
                                            {"Mã LTC: "} {ut.maLopTc} {" - "} {"Môn học: "} {ut.tenMh} {" - "} {"Giảng viên: "} {ut.tenGv}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No courses found</MenuItem>
                                )}
                            </Select>
                        </div>

                        <button
                            className="w-56 mt-auto text-white transition-all duration-200 bg-red-500 rounded-md h-9 hover:scale-105 hover:bg-red-700"
                            type="submit"
                        >
                            Lọc
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex  mt-1 justify-between" style={{ alignItems: "end" }}>
                {scores && (
                    <div className="flex mb-2 gap-x-2 justify-center">
                        <div className="text-base font-bold text-text1">
                            Môn học: <span className="text-base font-normal text-text2">{scores[0]?.tenMh}</span>
                        </div>
                        <div className="text-base font-bold text-text1">
                            Số tín chỉ: <span className="text-base font-normal text-text2">{scores[0]?.soTc}</span>
                        </div>
                        <div className="text-base font-bold text-text1">
                            %CC-%GK-%CK:{" "}
                            <span className="text-base font-normal text-text2">
                                {scores[0]?.percentCc} {scores[0]?.percentGk} {scores[0]?.percentCk}
                            </span>
                        </div>
                    </div>
                )}

                {/* import export  */}
                {course && (
                    <div className="flex mx-2 mt-1  justify-center ">
                        <form onSubmit={handleImportFile}>
                            <div className="flex gap-x-1">
                                <input type="file" ref={inputRef} onChange={handleFileChange} className="w-[200px] m-auto" />
                                <button
                                    className="relative  items-center gap-1 mr-4 w-[118px] h-[38px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
                                    type="submit"
                                >
                                    Upload File
                                </button>
                            </div>
                        </form>
                        <button
                            className="relative  items-center gap-1  w-[112px] h-[38px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
                            onClick={handleExport}
                        >
                            Tải File
                        </button>
                    </div>
                )}
            </div>

            <div className="flex gap-2 ">
                {scores && (
                    <div className="flex gap-x-5 text-text2">
                        <h1>Sắp xếp khi xuất danh sách </h1>
                        <div>
                            <input type="radio" value="maSv" checked={sortType === "maSv"} onChange={handleInputChange} className="mr-2" />
                            <span className="text-text2">Theo mã sinh viên</span>
                        </div>
                        <div>
                            <input type="radio" value="tenSv" checked={sortType === "tenSv"} onChange={handleInputChange} className="mr-2" />
                            Theo tên sinh viên
                        </div>
                    </div>
                )}

                {scores && (
                    <div className="flex gap-y-6 mb-2">
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="p-1 bg-[#c4c5cf] rounded-md cursor-pointe mt"
                                    id="dropdownMenuButton"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                >
                                    Cách tính điểm
                                </button>
                            </div>
                            {isOpen && (
                                <div
                                    className="absolute z-50 w-48 py-1 mt-1 bg-white border border-gray-300 rounded-md"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    {items.map((item, index) => (
                                        <p key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={() => handleItemClick(item)}>
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* {selectedItem && (
                    <div className="mt-2">
                        <p>Thông tin: {selectedItem}</p>
                    </div>
                )} */}
                    </div>
                )}
            </div>

            <div className="w-full">
                <div className="col-span-3">
                    <div className="flex justify-center">
                        {loading && scores?.length !== 0 && (
                            <Spinner message="Loading" height={50} width={150} color="#157572" messageColor="#157572" />
                        )}
                        {scores?.length === 0 && <p className="text-2xl font-bold text-red-500">Lớp tín chỉ chưa nhập điểm</p>}
                    </div>

                    {search && !loading && scores?.length > 0 && (
                        <div className="overflow-auto max-h-[350px]">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-[#E1EEEE] items-center">
                                    <tr>
                                        <th className="px-4 py-1">STT</th>
                                        <th className="px-4 py-1">Mã Sinh Viên</th>
                                        <th className="px-4 py-1">Sinh Viên</th>
                                        <th className="px-4 py-1">Điểm CC</th>
                                        <th className="px-4 py-1">Điểm GK</th>
                                        <th className="px-4 py-1">Điểm CK</th>
                                        <th className="px-4 py-1">Trung Bình</th>
                                        <th className="px-4 py-1">Xếp Loại</th>
                                        {valueMKH?.maKeHoach === "MKH1" && <th className="px-4 py-1">Hành Động</th>}
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {sortedScores?.map((score, idx) => (
                                        <tr className="justify-center item-center hover:bg-[#EEF5F5]" key={idx}>
                                            <td className="px-4 py-1 text-center border">{idx + 1}</td>

                                            <td className="px-4 py-1 text-center border">{score.maSv}</td>
                                            <td className="px-4 py-1 border ">{score.tenSv}</td>
                                            <td className="px-4 py-1 text-center border">{score.cc}</td>
                                            <td className="px-4 py-1 text-center border">{score.gk}</td>
                                            <td className="px-4 py-1 text-center border">{score.ck}</td>
                                            <td className="px-4 py-1 text-center border">{score.tb}</td>
                                            <td className="px-4 py-1 text-center border">{score.xepLoai}</td>
                                            <td
                                                className="items-center justify-center px-4 py-1 mr-0 text-center border"
                                                style={{ display: "flex", justifyContent: "center" }}
                                            >
                                                {valueMKH?.maKeHoach === "MKH1" && (
                                                    <button
                                                        className="px-3 py-[0.6] font-bold text-white rounded  hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                                                        onClick={() => handleEditClick(score)}
                                                    >
                                                        Sửa
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {selectedScore ? (
                <ReactModal isOpen={isModalOpen} onRequestClose={openModal} style={modalStyles} ariaHideApp={false}>
                    <div className="flex flex-col bg-white rounded-xl">
                        <form
                            className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
                            onSubmit={handleFormSubmit}
                        >
                            <div className="grid grid-cols-3 gap-x-10">
                                <div className={classes.WrapInputLabel}>
                                    <h1 className={classes.LabelStyle}>Mã sinh viên:</h1>
                                    <input placeholder={selectedScore?.maSv} disabled className={classes.InputStyle} type="text" value={value.maSv} />
                                </div>

                                <div className={classes.WrapInputLabel}>
                                    <h1 className={classes.LabelStyle}>Chuyên Cần :</h1>
                                    <input
                                        placeholder={selectedScore?.cc}
                                        className={classes.InputStyle}
                                        type="number"
                                        value={value.cc}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                cc: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className={classes.WrapInputLabel}>
                                    <h1 className={classes.LabelStyle}>Giữa kỳ :</h1>
                                    <input
                                        placeholder={selectedScore?.gk}
                                        className={classes.InputStyle}
                                        type="number"
                                        value={value.gk}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                gk: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className={classes.WrapInputLabel}>
                                    <h1 className={classes.LabelStyle}>Cuối kỳ :</h1>
                                    <input
                                        placeholder={selectedScore?.ck}
                                        className={classes.InputStyle}
                                        type="number"
                                        value={value.ck}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                ck: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className={classes.adminFormButton}>
                                <button className={classes.adminFormSubmitButton} type="submit">
                                    Lưu
                                </button>
                                <button className={classes.adminFormClearButton} type="button" onClick={closeModal}>
                                    Thoát
                                </button>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            ) : null}
        </div>
    );
};

export default Body;
