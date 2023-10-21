//    <table
//   className="w-full h-full border border-gray-300 border-solid min-h-[320px]"
//   style={{ tableLayout: "fixed" }}
// >
//   <thead className="bg-[#E1EEEE] items-center justify-center border border-gray-900">
//     <tr className="h-5">
//       <td className="items-center justify-center px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>THỨ 2</span>
//       </td>
//       <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>THỨ 3</span>
//       </td>
//       <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>THỨ 4</span>
//       </td>
//       <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>THỨ 5</span>
//       </td>
//       <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>THỨ 6</span>
//       </td>
//       <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>THỨ 7</span>
//       </td>
//       <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
//         <span>CHỦ NHẬT</span>
//       </td>
//     </tr>
//   </thead>
//   <tbody>
//     <tr className="">
//       <td
//         className="relative border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-monday-morning"
//         data-tooltip-place="bottom"
//       >
//         {monday && monday.tkbDtoList?.length > 0 && (
//           <div className="p-2 py-6 text-base text-text2">
//             {monday.tkbDtoList.map((object) =>
//               object.tiet === 1 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>

//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-tuesday-morning"
//         data-tooltip-place="bottom"
//       >
//         {tuesday && tuesday.tkbDtoList?.length > 0 && (
//           <div className="p-2 py-6 text-base text-text2">
//             {tuesday.tkbDtoList.map((object) =>
//               object.tiet === 1 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-wednesday-morning"
//         data-tooltip-place="bottom"
//       >
//         {wednesday && wednesday.tkbDtoList.length > 0 && (
//           <div className="p-2 py-6 text-base text-text2">
//             {wednesday.tkbDtoList.map((object) =>
//               object.tiet === 1 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-thursday-morning"
//         data-tooltip-place="bottom"
//       >
//         {thursday && thursday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {thursday.tkbDtoList.map((object) =>
//               object.tiet === 1 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-friday-morning"
//         data-tooltip-place="bottom"
//       >
//         {friday && friday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {friday.tkbDtoList.map((object) =>
//               object.tiet === 1 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-saturday-morning"
//         data-tooltip-place="bottom"
//       >
//         {saturday && saturday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {saturday.tkbDtoList.map((object) =>
//               object.tiet === 1 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td className="border border-gray-500 border-solid w-110"></td>
//     </tr>
//     <tr>
//       <td className="border border-gray-500 border-solid w-110">
//         {monday && monday.tkbDtoList && (
//           <div
//             className="p-2 py-6 text-base text-text2"
//             data-tooltip-id="tooltip-monday-after"
//             data-tooltip-place="bottom"
//           >
//             {monday.tkbDtoList.map((object) =>
//               object.tiet === 5 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-tuesday-after"
//         data-tooltip-place="bottom"
//       >
//         {tuesday && tuesday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {tuesday.tkbDtoList.map((object) =>
//               object.tiet === 5 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td className="border border-gray-500 border-solid w-110">
//         {wednesday && wednesday.tkbDtoList && (
//           <div
//             className="p-2 py-6 text-base text-text2"
//             data-tooltip-id="tooltip-wednesday-after"
//             data-tooltip-place="bottom"
//           >
//             {wednesday.tkbDtoList.map((object) =>
//               object.tiet === 5 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-thursday-after"
//         data-tooltip-place="bottom"
//       >
//         {thursday && thursday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {thursday.tkbDtoList.map((object) =>
//               object.tiet === 5 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-friday-after"
//         data-tooltip-place="bottom"
//       >
//         {friday && friday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {friday.tkbDtoList.map((object) =>
//               object.tiet === 5 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td
//         className="border border-gray-500 border-solid w-110"
//         data-tooltip-id="tooltip-saturday-after"
//         data-tooltip-place="bottom"
//       >
//         {saturday && saturday.tkbDtoList && (
//           <div className="p-2 py-6 text-base text-text2">
//             {saturday.tkbDtoList.map((object) =>
//               object.tiet === 5 ? (
//                 <div>
//                   <h3>{object.tenMh}</h3>
//                   <div>phòng: {object.phong}</div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </td>
//       <td className="border border-gray-500 border-solid w-110"></td>
//     </tr>
//   </tbody>
// </table>
