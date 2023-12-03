import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import Swal from "sweetalert2";
import {
  deleteSubject,
  getSubjectDepartment,
  updateSubject,
} from "../../../redux/actions/adminActions";
import {
  DELETE_SUBJECT,
  SET_ERRORS,
  UPDATE_SUBJECT,
} from "../../../redux/actionTypes";
import ReactSelect from "react-select";

// http://localhost:9090/api/admin/monHoc/khoa/CNTT?page=0&size=3

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const departments = useSelector((state) => state.admin.allDepartment);
  departments?.sort(
    (a, b) => a.tenKhoa.charCodeAt(0) - b.tenKhoa.charCodeAt(0)
  );

  // paging
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const itemsPerPage = 12;

  // phục vụ xóa
  const departmentObj = departments?.find((dp) => dp.tenKhoa === department);
  const departmentId = departmentObj?.maKhoa;

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (!department) dispatch({ type: "RESET_SUBJECTS" });
  }, [department]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const departmentObj = departments.find((dp) => dp.tenKhoa === department);
    if (!departmentObj) return;
    const departmentId = departmentObj?.maKhoa;
    dispatch(getSubjectDepartment(departmentId, nextPage, itemsPerPage));
  };

  const subjects = useSelector((state) => state.admin.subjects.retObj);
  subjects?.sort((a, b) => a.tenMh.charCodeAt(0) - b.tenMh.charCodeAt(0));
  // tien quyet
  const initialSubjects = subjects;
  const mhtqOptions = initialSubjects?.map((sub) => ({
    value: sub.maMh,
    label: sub.tenMh,
  }));
  console.log("mhtqOptions", mhtqOptions);
  const dataPagine = useSelector((state) => state.admin.subjects);

  useEffect(() => {
    if (!departments) return;
    if (!department) return;
    const departmentObj = departments.find((dp) => dp.tenKhoa === department);
    const departmentId = departmentObj?.maKhoa;
    dispatch(getSubjectDepartment(departmentId, nextPage, itemsPerPage));
  }, [nextPage, departments]);

  useEffect(() => {
    if (subjects?.length !== 0 || subjects?.length === 0) {
      setLoading(false);
    }
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // Begin edit
  // giá trị môn tiên quyết
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log("selectedOptions", selectedOptions);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    maMh: "",
    tenMh: "",
    soTc: "",
    percentCc: "",
    percentGk: "",
    percentCk: "",
    soTietLt: "",
    soTietTh: "",
    maKhoa: "",
    maMHTQList: [],
  });

  const handleEditClick = (sub) => {
    setSelectedSubject(sub);
    setIsModalOpen(true);
    setValue({
      maMh: sub.maMh,
      tenMh: "",
      soTc: "",
      percentCc: "",
      percentGk: "",
      percentCk: "",
      soTietLt: "",
      soTietTh: "",
      maKhoa: sub.maKhoa,
      id: sub.id,
      maMHTQList: [],
    });
    setSelectedOptions(
      (sub.maMHTQList || []).map((value, index) => ({
        value: value,
        label: sub.tenMHTQList[index],
      }))
    );
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedValue = {};
    if (value.tenMh !== "") {
      updatedValue.tenMh = value.tenMh;
    } else {
      updatedValue.tenMh = selectedSubject.tenMh;
    }
    if (value.soTc !== "") {
      updatedValue.soTc = value.soTc;
    } else {
      updatedValue.soTc = selectedSubject.soTc;
    }
    if (value.percentCc !== "") {
      updatedValue.percentCc = value.percentCc;
    } else {
      updatedValue.percentCc = selectedSubject.percentCc;
    }
    if (value.percentGk !== "") {
      updatedValue.percentGk = value.percentGk;
    } else {
      updatedValue.percentGk = selectedSubject.percentGk;
    }
    if (value.percentCk !== "") {
      updatedValue.percentCk = value.percentCk;
    } else {
      updatedValue.percentCk = selectedSubject.percentCk;
    }
    if (value.soTietLt !== "") {
      updatedValue.soTietLt = value.soTietLt;
    } else {
      updatedValue.soTietLt = selectedSubject.soTietLt;
    }
    if (value.soTietTh !== "") {
      updatedValue.soTietTh = value.soTietTh;
    } else {
      updatedValue.soTietTh = selectedSubject.soTietTh;
    }
    if (value.maMHTQList !== "") {
      updatedValue.maMHTQList = value.maMHTQList;
    } else {
      updatedValue.maMHTQList = selectedSubject.maMHTQList;
    }
    dispatch(updateSubject({ ...selectedSubject, ...updatedValue }));
    dispatch({ type: UPDATE_SUBJECT, payload: false });
  };

  useEffect(() => {
    if (!store.admin.updatedSubject) return;
    if (!selectedSubject.maKhoa) return;
    setError({});
    closeModal();
    dispatch(
      getSubjectDepartment(selectedSubject.maKhoa, nextPage, itemsPerPage)
    );
  }, [dispatch, store.errors, store.admin.updatedSubject]);
  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // Begin delete
  const [checkedValue, setCheckedValue] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };
  const dltSubject = (e) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, Xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteSubject(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.subjectDeleted) {
      setLoading(false);
      setCheckedValue([]);
      const departmentObj = departments?.find(
        (dp) => dp.tenKhoa === department
      );
      if (!departmentObj) return;
      const departmentId = departmentObj?.maKhoa;
      dispatch(getSubjectDepartment(departmentId, nextPage, itemsPerPage));
      dispatch({ type: DELETE_SUBJECT, payload: false });
    }
  }, [store.admin.subjectDeleted]);

  useEffect(() => {
    if (!store.errors) return;
    if (!departmentId) return;
    dispatch(getSubjectDepartment(departmentId, nextPage, itemsPerPage));
  }, [store.errors]);

  // End delete

  // handle paging
  useEffect(() => {
    if (!dataPagine || !dataPagine.totalPages) return;
    setPageCount(Math.ceil(dataPagine.totalRetObjs / itemsPerPage));
  }, [dataPagine, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataPagine.totalRetObjs;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1 - 1);
  };
  /// thử nghiệm

  const calculatePercentCk = () => {
    const percentCc = value?.percentCc || selectedSubject?.percentCc;
    const percentGk = value?.percentGk || selectedSubject?.percentGk;

    if (!isNaN(percentCc) && !isNaN(percentGk)) {
      const percentCk = 100 - percentCc - percentGk;
      setValue((prevValue) => ({
        ...prevValue,
        percentCk: isNaN(percentCk) ? "" : percentCk.toString(),
      }));
    }
  };

  useEffect(() => {
    calculatePercentCk();
  }, [value?.percentCc, value?.percentGk]);

  const handleInputChangeValue = (e, field) => {
    const newValue = e.target.value;
    setValue((prevValue) => ({
      ...prevValue,
      [field]: newValue,
    }));
  };
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/adddsubject" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {subjects && subjects.length !== 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(subjects && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="department">
            Chọn khoa để xem danh sách môn học:
          </label>

          <div className="flex">
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 284 }}
              inputProps={{ "aria-label": "Without label" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.tenKhoa}>
                  {dp.tenKhoa}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56 ml-3`}
              type="submit"
            >
              Lọc
            </button>
          </div>
        </form>
      </div>

      <div className="w-full min-h-[427px]">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && subjects?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}

            {subjects?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Khoa chưa có môn học
              </p>
            )}
          </div>

          {search && !loading && subjects?.length !== 0 && (
            <div className="overflow-auto max-h-[450px]">
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center top-0 sticky ">
                  <tr>
                    <th className="px-4 py-1">Chọn</th>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">MMH</th>
                    <th className="px-4 py-1" style={{ width: "300px" }}>
                      Tên môn học
                    </th>
                    <th className="px-4 py-1">%CC</th>
                    <th className="px-4 py-1">%GK</th>
                    <th className="px-4 py-1">%CK</th>
                    <th className="px-4 py-1">Số tiết LT</th>
                    <th className="px-4 py-1">Số tiết TH</th>
                    <th className="px-4 py-1">Số tín chỉ</th>
                    <th className="px-4 py-1">Môn tiên quyết</th>
                    <th className="px-4 py-1">Hành động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {subjects?.map((sub, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-1 border">
                        <input
                          onChange={handleInputChange}
                          checked={checkedValue.includes(sub.id)}
                          value={sub.id}
                          type="checkbox"
                          className="accent-[#157572]"
                        />
                      </td>
                      <td className="px-4 py-1 border">{idx + 1}</td>

                      <td className="px-4 py-1 border">{sub.maMh}</td>
                      <td
                        className="px-4 py-1 border"
                        style={{ width: "300px" }}
                      >
                        {sub.tenMh}
                      </td>
                      <td className="px-4 py-1 border">{sub.percentCc}</td>
                      <td className="px-4 py-1 border">{sub.percentGk}</td>
                      <td className="px-4 py-1 border">{sub.percentCk}</td>
                      <td className="px-4 py-1 border">{sub.soTietLt}</td>
                      <td className="px-4 py-1 border">{sub.soTietTh}</td>
                      <td className="px-4 py-1 border">{sub.soTc}</td>

                      {/* <td className="px-4 py-1 border">{sub.tenMHTQList}</td> */}

                      <td className="px-4 py-1 border">
                        {sub.tenMHTQList?.map((item) => (
                          <div>{item}</div>
                        ))}
                      </td>

                      <td className="px-4 py-1 border">
                        <div
                          className="flex justify-center"
                          style={{ width: "100%", alignItems: "center" }}
                        >
                          <button
                            className="px-3 h-full py-[0.7] font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                            onClick={() => handleEditClick(sub)}
                          >
                            Sửa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* modal edit */}
      {selectedSubject ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl w-full ">
            <form
              className="w-[1624px] min-h-[500px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-4 mt-4 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Môn Học:</h1>
                  <input
                    placeholder={selectedSubject?.maMh}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maMh}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Ten Môn Học :</h1>
                  <input
                    placeholder={selectedSubject?.tenMh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.tenMh}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tenMh: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tín Chỉ :</h1>
                  <input
                    placeholder={selectedSubject?.soTc}
                    className={classes.InputStyle}
                    type="text"
                    value={value.soTc}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        soTc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>%CC :</h1>
                  <input
                    placeholder={selectedSubject?.percentCc}
                    className={classes.InputStyle}
                    type="text"
                    value={value.percentCc}
                    onChange={(e) => handleInputChangeValue(e, "percentCc")}
                    onBlur={() => calculatePercentCk()}
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>%GK :</h1>
                  <input
                    placeholder={selectedSubject?.percentGk}
                    className={classes.InputStyle}
                    type="text"
                    value={value.percentGk}
                    onChange={(e) => handleInputChangeValue(e, "percentGk")}
                    onBlur={() => calculatePercentCk()}
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>%CK :</h1>
                  <input
                    disabled
                    placeholder={selectedSubject?.percentCk}
                    className={classes.InputStyle}
                    type="text"
                    value={value.percentCk}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        percentCk: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tiết lý thuyết :</h1>
                  <input
                    placeholder={selectedSubject?.soTietLt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.soTietLt}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        soTietLt: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tiết thực hành :</h1>
                  <input
                    placeholder={selectedSubject?.soTietTh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.soTietTh}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        soTietTh: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>
                    Chọn môn học tiên quyết *:
                  </h1>

                  <ReactSelect
                    isMulti
                    displayEmpty
                    name="values"
                    options={mhtqOptions}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      setSelectedOptions(selectedOptions);
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      setValue((prevValue) => ({
                        ...prevValue,
                        maMHTQList: [...selectedValues],
                      }));
                    }}
                    classNamePrefix="select"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/allsubject" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Thoát
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
      {subjects?.length > 0 && (
        <div className="flex items-center justify-center w-full mt-1 mb-1">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Body;
