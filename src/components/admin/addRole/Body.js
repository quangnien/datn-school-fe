import { ADD_ROLE, SET_ERRORS } from "../../../redux/actionTypes";
import { addRole } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import ReactSelect from "react-select";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const store = useSelector((state) => state);
  //
  // useEffect(() => {
  //   dispatch(getAllMenu);
  // }, []);
  // code new
  const menus = useSelector((state) => state.admin.allMenu);

  const menuOptions = menus?.map((menu) => ({
    value: menu.menuCode,
    label: menu.menuName,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  //-------
  const [value, setValue] = useState({
    roleCode: "",
    roleName: "",
    menuCodeList: [],
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    dispatch(addRole(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.roleAdded) {
      setLoading(false);
      if (store.admin.roleAdded) {
        setValue({
          roleCode: "",
          roleName: "",

          menuCodeList: "",
        });
        setSelectedOptions([]);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_ROLE, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.roleAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm role</h1>
        </div>
        <Link to="/admin/getroleall" className="btn btn-[#157572] inline-block">
          <button className="block px-4 py-2  font-bold text-white rounded bg-[#157572]  hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-4 gap-x-10">
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên Role *:</h1>

                <input
                  placeholder="Tên Role"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.roleName}
                  onChange={(e) =>
                    setValue({ ...value, roleName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Mã Role *:</h1>

                <input
                  placeholder="Mã Role"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.roleCode}
                  onChange={(e) =>
                    setValue({ ...value, roleCode: e.target.value })
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
                    console.log("selectedOptions",selectedOptions)
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

            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    roleCode: "",
                    roleName: "",
                    menuCodeList: [],
                  });
                  setError({});
                  setSelectedOptions([]);
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Xóa
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang role..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="157572"
                />
              )}
              {error.message ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
