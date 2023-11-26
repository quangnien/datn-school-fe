import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Spinner from "../../../utils/Spinner";
import Swal from "sweetalert2";
import {
  deleteRole,
  getAllRole,
  getCurrentUser,
  updateRole,
} from "../../../redux/actions/adminActions";
import {
  DELETE_ROLE,
  SET_ERRORS,
  UPDATE_ROLE,
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

  const menus = useSelector((state) => state.admin.allMenu);
  const roles = useSelector((state) => state.admin.allRole);

  // tien quyet
  const initialMenus = menus;
  const menuOptions = initialMenus?.map((sub) => ({
    value: sub.menuCode,
    label: sub.menuName,
  }));

  useEffect(() => {
    dispatch(getAllRole());
  }, []);

  useEffect(() => {
    if (roles?.length !== 0 || roles?.length === 0) {
      setLoading(false);
    }
  }, [roles]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // Begin edit
  // giá trị môn tiên quyết
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    roleCode: "",
    roleName: "",
    menuCodeList: "",
  });

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
    setValue({
      roleCode: role.roleCode,
      id: role.id,
      menuCodeList: [],
    });
    setSelectedOptions(
      (role.menuCodeList || []).map((value, index) => ({
        value: value,
        label: role.menuNameList[index],
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
    if (value.roleCode !== "") {
      updatedValue.roleCode = value.roleCode;
    } else {
      updatedValue.roleCode = selectedRole.roleCode;
    }
    if (value.roleName !== "") {
      updatedValue.roleName = value.roleName;
    } else {
      updatedValue.roleName = selectedRole.roleName;
    }

    if (value.menuCodeList !== "") {
      updatedValue.menuCodeList = value.menuCodeList;
    } else {
      updatedValue.menuCodeList = selectedRole.menuCodeList;
    }
    dispatch(updateRole({ ...selectedRole, ...updatedValue }));
    dispatch({ type: UPDATE_ROLE, payload: false });
  };

  useEffect(() => {
    if (!store.admin.updatedRole) return;
    setError({});
    closeModal();
    dispatch(getAllRole());
    dispatch(getCurrentUser());

    

  }, [dispatch, store.errors, store.admin.updatedRole]);


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
        dispatch(deleteRole(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.roleDeleted) {
      setLoading(false);
      setCheckedValue([]);

      dispatch(getAllRole());
      dispatch({ type: DELETE_ROLE, payload: false });
    }
  }, [store.admin.roleDeleted]);

  useEffect(() => {
    if (!store.errors) return;

    dispatch(getAllRole());
  }, [store.errors]);

  // End delete

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/addRole" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {roles && roles.length !== 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(roles && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>

      <div className="w-full min-h-[427px]">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && roles?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}

            {roles?.length === 0 && (
              <p className="text-2xl font-bold text-red-500"></p>
            )}
          </div>

          { !loading && roles?.length !== 0 && (
            <div className="overflow-auto max-h-[450px]">
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center top-0 sticky ">
                  <tr>
                    <th className="px-4 py-1">Chọn</th>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">Mã role</th>
                    <th className="px-4 py-1" style={{ width: "300px" }}>
                      Tên Role
                    </th>

                    <th className="px-4 py-1">Menu list</th>
                    <th className="px-4 py-1">Hành động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {roles?.map((sub, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-1 border text-center">
                        <input
                          onChange={handleInputChange}
                          checked={checkedValue.includes(sub.id)}
                          value={sub.id}
                          type="checkbox"
                          className="accent-[#157572]"
                        />
                      </td>
                      <td className="px-4 py-1 border text-center">{idx + 1}</td>

                      <td className="px-4 py-1 border">{sub.roleCode}</td>
                      <td
                        className="px-4 py-1 border"
                        style={{ width: "300px" }}
                      >
                        {sub.roleName}
                      </td>

                      <td className="px-4 py-1 border">
                        {sub.menuNameList?.map((item) => (
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
      {selectedRole ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[400px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-4 mt-4 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Role:</h1>
                  <input
                    placeholder={selectedRole?.roleCode}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.roleCode}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên Role :</h1>
                  <input
                    placeholder={selectedRole?.roleName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.roleName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        roleName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chọn Menu *:</h1>

                  <ReactSelect
                    isMulti
                    displayEmpty
                    name="values"
                    options={menuOptions}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      setSelectedOptions(selectedOptions);
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      setValue((prevValue) => ({
                        ...prevValue,
                        menuCodeList: [...selectedValues],
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
                <Link to="/admin/getroleall" className="btn btn-primary">
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
    </div>
  );
};

export default Body;
