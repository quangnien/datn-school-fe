import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Spinner from "../../../utils/Spinner";
import {
  getAllGvDow,
  updateGvDow,
} from "../../../redux/actions/adminActions";
import {
  SET_ERRORS,
  UPDATE_GV_DOW,
} from "../../../redux/actionTypes";
import ReactSelect from "react-select";


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
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);



  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const dayOfWeeks = useSelector((state) => state.admin.allDayOfWeek);
  const gvDow = useSelector((state) => state.admin.allGvDow);

  // day of week
  const initialdayofweeks = dayOfWeeks;
  const dayofweekOptions = initialdayofweeks?.map((sub) => ({
    value: sub.maDow,
    label: sub.weekDay,
  }));


  console.log("dayofweeks", dayofweekOptions)

  useEffect(() => {
    dispatch(getAllGvDow());
  }, []);

  useEffect(() => {
    if (gvDow?.length !== 0 || gvDow?.length === 0) {
      setLoading(false);
    }
  }, [gvDow]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // Begin edit
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedGvDow, setSelectedGvDow] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    maGv: "",
    dowCodeList: "",
  });

  const handleEditClick = (gvDow) => {
    setSelectedGvDow(gvDow);
    setIsModalOpen(true);
    setValue({
      maGv: gvDow.maGv,
      dowCodeList: [],
    });
    setSelectedOptions(
      (gvDow.dowCodeList || []).map((value, index) => ({
        value: value,
        label: gvDow.dowNameList[index],
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
    if (value.maGv !== "") {
      updatedValue.maGv = value.maGv;
    } else {
      updatedValue.maGv = selectedGvDow.maGv;
    }
    if (value.dowCodeList !== "") {
      updatedValue.dowCodeList = value.dowCodeList;
    } else {
      updatedValue.dowCodeList = selectedGvDow.dowCodeList;
    }
    dispatch(updateGvDow({ ...selectedGvDow, ...updatedValue }));
    dispatch({ type: UPDATE_GV_DOW, payload: false });
  };

  useEffect(() => {
    if (!store.admin.updatedGvDow) return;
    setError({});
    closeModal();
    dispatch(getAllGvDow());
    

  }, [dispatch, store.errors, store.admin.updatedGvDow]);


  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="w-full min-h-[427px]">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && gvDow?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}

            {gvDow?.length === 0 && (
              <p className="text-2xl font-bold text-red-500"></p>
            )}
          </div>

          { !loading && gvDow?.length !== 0 && (
            <div className="overflow-auto max-h-[450px]">
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center top-0 sticky ">
                  <tr>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">Mã Gv</th>
                    <th className="px-4 py-1">Lịch dạy</th>
                    <th className="px-4 py-1">Hành động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {gvDow?.map((sub, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                     
                      <td className="px-4 py-1 border text-center">{idx + 1}</td>

                      <td className="px-4 py-1 border">{sub.maGv}</td>
                     

                      <td className="px-4 py-1 border">
                        {sub.dowNameList?.map((item) => (
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
      {selectedGvDow ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-[1724px] min-h-[600px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-4 mt-4 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Giảng Viên:</h1>
                  <input
                    placeholder={selectedGvDow?.maGv}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maGv}
                  />
                  
                </div>

              

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chọn buổi dạy *:</h1>

                  <ReactSelect
                    isMulti
                    displayEmpty
                    name="values"
                    options={dayofweekOptions}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      setSelectedOptions(selectedOptions);
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      setValue((prevValue) => ({
                        ...prevValue,
                        dowCodeList: [...selectedValues],
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
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Thoát
                  </button>
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
    </div>
  );
};

export default Body;
