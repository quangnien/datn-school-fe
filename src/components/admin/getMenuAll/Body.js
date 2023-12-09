import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMenu,
  getAllMenu,
  updateDepartment,
  updateMenu,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  DELETE_MENU,
  SET_ERRORS,
  UPDATE_MENU,
} from "../../../redux/actionTypes";

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
  const store = useSelector((state) => state);
  const menus = useSelector((state) => state.admin.allMenu);
  // debugger;
  if (menus != null) {
    menus.sort((a, b) => a.menuName.charCodeAt(0) - b.menuName.charCodeAt(0));
  }
  const [selectedMenu, setSelectedMenu] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    menuCode: "",
    menuName: "",
    id: "",
  });
  const handleEditClick = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
    setValue({
      menuName: "",
      menuCode: menu.menuCode,
      id: menu.id,
    });
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
    if (value.menuName !== "") {
      updatedValue.menuName = value.menuName;
    } else {
      updatedValue.menuName = selectedMenu.menuName;
    }

    dispatch(updateMenu({ ...selectedMenu, ...updatedValue }));
    dispatch({ type: UPDATE_MENU, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedMenu) {
      setError({});
      closeModal();
      dispatch(getAllMenu());
    }
  }, [dispatch, store.errors, store.admin.updatedMenu]);

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
        dispatch(deleteMenu(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.menuDeleted) {
      setCheckedValue([]);
      dispatch(getAllMenu());
      dispatch({ type: DELETE_MENU, payload: false });
    }
  }, [store.admin.menuDeleted]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/addMenu" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {menus && checkedValue?.length > 0 ? (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
          >
            Xóa
          </button>
        ) : (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4"
            disabled
          >
            Xóa
          </button>
        )}
      </div>
      <div className="w-full my-8 mt-6">
        {menus?.length !== 0 && (
          <div className="overflow-auto max-h-[550px]">
<table className="w-full table-auto ">
            <thead className="sticky top-0 bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">Chọn</th>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Mã Menu</th>
                <th className="px-4 py-1">Tên Menu</th>
                <th className="px-4 py-1">Hành động</th>
              </tr>
            </thead>
            <tbody className="">
              {menus?.map((dep, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  <td className="px-4 py-1 text-center border">
                    <input
                      onChange={handleInputChange}
                      checked={checkedValue.includes(dep.id)}
                      value={dep.id}
                      type="checkbox"
                      className="accent-[#157572]"
                    />
                  </td>
                  <td className="px-4 py-1 text-center border ">{idx + 1}</td>
                  <td className="px-4 py-1 text-left border">
                    {dep.menuCode}
                  </td>
                  <td className="px-4 py-1 text-left border">
                    {dep.menuName}
                  </td>

                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(dep)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

            </div>
          
        )}
      </div>
      {/* modal edit */}
      {selectedMenu ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Menu :</h1>
                  <input
                    placeholder={selectedMenu?.menuCode}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên menu :</h1>
                  <input
                    placeholder={selectedMenu?.menuName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.menuName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        menuName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/getmenuall" className="btn btn-primary">
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
