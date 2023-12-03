import { SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const Body = () => {
  const [error, setError] = useState({});

  // Kỳ 0
  const scores0 = useSelector((state) => state?.student?.scores0?.retObj);
  const totalCredits0 = scores0?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soTc;
  }, 0);

  const weightedSum0he10 = scores0?.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      (currentValue.tb >= 4 ? currentValue.tb * currentValue.soTc : 0)
    );
  }, 0);

  const gpa0 = (weightedSum0he10 / totalCredits0).toFixed(2);
  const SotcDat0 = scores0?.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.tb >= 4 ? currentValue.soTc : 0);
  }, 0);
  // kỳ 1
  const scores1 = useSelector((state) => state?.student?.scores1?.retObj);

  const totalCredits1 = scores1?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.soTc;
  }, 0);

  const weightedSum1he10 = scores1?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.tb * currentValue.soTc;
  }, 0);

  const gpa1 = (weightedSum1he10 / totalCredits1).toFixed(2);
  // số tính chỉ đạt >=4.0
  const SotcDat1 = scores1?.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.tb >= 4 ? currentValue.soTc : 0);
  }, 0);
  // tổng tất cả các kỳ
  const totalCreditsAll = totalCredits0 + totalCredits1; // tổng tất cả số tín chỉ
  const weightedSumAll = weightedSum0he10 + weightedSum1he10; // tổng điểm
  const gpaTong = (weightedSumAll / totalCreditsAll).toFixed(2); // gpa tổng
  // tổng số tất cả tín chỉ đạt trong tất cả học kỳ
  const sotcDatAll = SotcDat0 + SotcDat1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex flex-col mt-1">
        <div>
          <div className="w-full">
            <div className="col-span-3">
              <h1 className="font-semibold">Học kỳ 2 Năm học 2022-2023</h1>
              {Object.keys(error).length === 0 && scores1?.length !== 0 && (
                <div>
                  <table className="w-full table-auto">
                    <thead className="bg-[#E1EEEE] items-center">
                      <tr>
                        <th className="px-4 py-2">STT</th>
                        <th className="px-4 py-2">Tên môn</th>
                        <th className="px-4 py-2">TC</th>
                        <th className="px-4 py-2">%CC</th>
                        <th className="px-4 py-2">%GK</th>
                        <th className="px-4 py-2">%CK</th>
                        <th className="px-4 py-2">Điểm CC</th>
                        <th className="px-4 py-2">Điểm GK</th>
                        <th className="px-4 py-2">Điểm CK</th>
                        <th className="px-4 py-2">Điểm TK (10)</th>
                        <th className="px-4 py-2"> Điểm TK (C)</th>
                        <th className="px-4 py-2">Kết quả</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {scores1?.map((score, idx) => (
                        <tr
                          className="justify-center item-center hover:bg-[#EEF5F5]"
                          key={idx}
                        >
                          <td className="px-4 py-2 text-center border">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.tenMh}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.soTc}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.percentCc}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.percentCk}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.percentGk}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.cc}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.gk}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.ck}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.tb}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.xepLoai}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.xepLoai === "F" || score.xepLoai === null ? (
                              <div className="text-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="red"
                                  className="w-6 h-6 m-auto"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="#157572"
                                  className="w-6 h-6 m-auto"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-between mt-4">
                <div className="">
                  {/* tổng kỳ 1 */}
                  <div> - Điểm trung bình tích lũy hệ 10: {gpa1}</div>

                  <div> - Số tín chỉ đạt học kỳ: {SotcDat1}</div>
                </div>
                {/* tổng */}
                <div className="">
                  <div> - Điểm trung bình tích lũy hệ 10: {gpaTong}</div>

                  <div> - Số tín chỉ tích lũy: {sotcDatAll}</div>
                </div>
              </div>
              {Object.keys(error).length === 0 && scores0?.length !== 0 && (
                <div className="mt-5">
                  <h1 className="font-semibold">Học kỳ 1 Năm học 2022-2023</h1>
                  <table className="w-full table-auto">
                    <tbody className="">
                      {scores0?.map((score, idx) => (
                        <tr
                          className="justify-center item-center hover:bg-[#EEF5F5]"
                          key={idx}
                        >
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "64px" }}
                          >
                            {idx + 1}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "281px" }}
                          >
                            {score.tenMh}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "56px" }}
                          >
                            {score.soTc}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.percentCc}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.percentGk}
                          </td>
                          <td className="px-4 py-2 text-center border">
                            {score.percentCk}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "112px" }}
                          >
                            {score.cc}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "112px" }}
                          >
                            {score.gk}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "112px" }}
                          >
                            {score.ck}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "151px" }}
                          >
                            {score.tb}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "130px" }}
                          >
                            {score.xepLoai}
                          </td>
                          <td
                            className="px-4 py-2 text-center border"
                            style={{ width: "93px" }}
                          >
                            {score.xepLoai === "F"  || score.xepLoai === null ? (
                              <div className="text-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="red"
                                  className="w-6 h-6 m-auto"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="#157572"
                                  className="w-6 h-6 m-auto"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-between mt-4">
                <div className="">
                  <div> - Điểm trung bình tích lũy hệ 10: {gpa0}</div>
                  <div> - Số tín chỉ đạt học kỳ: {totalCredits0}</div>
                </div>
                <div>
                  <div> - Điểm trung bình tích lũy hệ 10: {gpa0}</div>
                  <div> - Số tín chỉ tích lũy: {SotcDat0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
