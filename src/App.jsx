import { useState, useReducer } from "react";

import "./index.css";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const defaultColumns = [
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "status",
            header: "Status",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

function App() {
  const [data, setData] = useState([...defaultData]);
  const [columns] = useState(() => [...defaultColumns]);

  const [columnResizeMode, setColumnResizeMode] = useState("onChange");

  const [columnResizeDirection, setColumnResizeDirection] = useState("ltr");

  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <select
        value={columnResizeMode}
        onChange={(e) => setColumnResizeMode(e.target.value)}
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: onEnd</option>
        <option value="onChange">Resize:onChange</option>
      </select>
      <select
        value={columnResizeDirection}
        onChange={(e) => setColumnResizeDirection(e.target.value)}
        className="border p-2 border-black rounded"
      >
        <option value="ltr">Resize Direction: ltr</option>
        <option value="rtl">Resize Direction: rtl</option>
      </select>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="h-4" />
        <div className="text-xl">{"<table/>"}</div>
        <div className="overflow-x-auto">
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    table.options.columnResizeDirection ===
                                    "rtl"
                                      ? -1
                                      : 1
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      {...{
                        key: cell.id,
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-4" />
        <div className="text-xl">{"<div/> (relative)"}</div>
        <div className="overflow-x-auto">
          <div
            {...{
              className: "divTable",
              style: {
                width: table.getTotalSize(),
              },
            }}
          >
            <div className="thead">
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  key={headerGroup.id}
                  {...{
                    key: headerGroup.id,
                    className: "tr",
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <div
                      key={header.id}
                      {...{
                        key: header.id,
                        className: "th",
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    table.options.columnResizeDirection ===
                                    "rtl"
                                      ? -1
                                      : 1
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              {...{
                className: "tbody",
              }}
            >
              {table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  {...{
                    key: row.id,
                    className: "tr",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      {...{
                        key: cell.id,
                        className: "td",
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-4" />
        <div className="text-xl">{"<div/> (absolute positioning)"}</div>
        <div className="overflow-x-auto">
          <div
            {...{
              className: "divTable",
              style: {
                width: table.getTotalSize(),
              },
            }}
          >
            <div className="thead">
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  key={headerGroup.id}
                  {...{
                    key: headerGroup.id,
                    className: "tr",
                    style: {
                      position: "relative",
                    },
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <div
                      key={header.id}
                      {...{
                        key: header.id,
                        className: "th",
                        style: {
                          position: "absolute",
                          left: header.getStart(),
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    table.options.columnResizeDirection ===
                                    "rtl"
                                      ? -1
                                      : 1
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              {...{
                className: "tbody",
              }}
            >
              {table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  {...{
                    key: row.id,
                    className: "tr",
                    style: {
                      position: "relative",
                    },
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      {...{
                        key: cell.id,
                        className: "td",
                        style: {
                          position: "absolute",
                          left: cell.column.getStart(),
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
      <pre>
        {JSON.stringify(
          {
            columnSizing: table.getState().columnSizing,
            columnSizingInfo: table.getState().columnSizingInfo,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default App;
