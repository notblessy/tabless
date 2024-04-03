// import React, { useMemo } from "react";
// import { useTable, useBlockLayout } from "react-table";
// import { Resizable } from "react-resizable";

// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateCell,
// }) => {
//   const [value, setValue] = React.useState(initialValue);

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   const onBlur = () => {
//     updateCell(index, id, value);
//   };

//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   return <input value={value} onChange={onChange} onBlur={onBlur} />;
// };

// const EditableTable = ({ columns, data }) => {
//   const defaultColumn = useMemo(
//     () => ({
//       minWidth: 100,
//       width: 150,
//       maxWidth: 400,
//     }),
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns,
//         data,
//         defaultColumn,
//       },
//       useBlockLayout
//     );

//   const updateCell = (rowIndex, columnId, value) => {
//     // Update your data here, e.g., using setState or Redux actions
//     console.log(
//       `Update cell at [${rowIndex}, ${columnId}] with value: ${value}`
//     );
//   };

//   return (
//     <div {...getTableProps()} className="table">
//       <div className="header">
//         {headerGroups.map((headerGroup, index) => (
//           <div
//             key={index}
//             {...headerGroup.getHeaderGroupProps()}
//             className="tr"
//           >
//             {headerGroup.headers.map((column) => (
//               <>
//                 {console.log("size = ", column.width)}
//                 {console.log("column = ", column)}
//                 <Resizable
//                   key={column.id}
//                   width={column.width}
//                   direction="horizontal"
//                   onResize={(e, { size }) => {
//                     column.setWidth(size.width);
//                   }}
//                 >
//                   <div {...column.getHeaderProps()} className="th">
//                     {column.render("Header")}
//                   </div>
//                 </Resizable>
//               </>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div {...getTableBodyProps()} className="body">
//         {rows.map((row, rowIndex) => {
//           prepareRow(row);
//           return (
//             <div key={rowIndex} {...row.getRowProps()} className="tr">
//               {row.cells.map((cell, index) => (
//                 <div key={index} {...cell.getCellProps()} className="td">
//                   <EditableCell
//                     value={cell.value}
//                     row={row}
//                     column={cell.column}
//                     updateCell={updateCell}
//                   />
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default EditableTable;
