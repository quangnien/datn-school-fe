import Body from "./Body";
import Header from "../Header";
import React from "react";
import Sidebar from "../Sidebar";
import { useDispatch } from "react-redux";
import { getAllMenu } from "../../../redux/actions/adminActions";

const GetRoleList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMenu());
  }, [dispatch]);
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center ">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default GetRoleList;
