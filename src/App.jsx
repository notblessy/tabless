import { useState, useReducer } from "react";

import "./index.css";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const getTextWidth = (text) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = getComputedStyle(document.body).font;

  return context.measureText(text).width;
};

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    phone: "+1234567890",
    city: "New York",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    email: "jane.smith@example.com",
    phone: "+1987654321",
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 35,
    email: "alice.johnson@example.com",
    phone: "+1122334455",
    city: "Chicago",
  },
  {
    id: 4,
    name: "Bob Williams",
    age: 40,
    email: "bob.williams@example.com",
    phone: "+1555666777",
    city: "Houston",
  },
  {
    id: 5,
    name: "Michael Brown",
    age: 28,
    email: "michael.brown@example.com",
    phone: "+1444333222",
    city: "San Francisco",
  },
  {
    id: 6,
    name: "Emma Davis",
    age: 32,
    email: "emma.davis@example.com",
    phone: "+1666777888",
    city: "Seattle",
  },
  {
    id: 7,
    name: "James Wilson",
    age: 45,
    email: "james.wilson@example.com",
    phone: "+1777888999",
    city: "Miami",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    age: 27,
    email: "olivia.martinez@example.com",
    phone: "+1888999000",
    city: "Dallas",
  },
  {
    id: 9,
    name: "William Jones",
    age: 33,
    email: "william.jones@example.com",
    phone: "+1999000111",
    city: "Atlanta",
  },
  {
    id: 10,
    name: "Sophia Anderson",
    age: 29,
    email: "sophia.anderson@example.com",
    phone: "+1000111222",
    city: "Boston",
  },
];

const col = Object.keys(users[0]);

const defaultColumns = col.map((item) => {
  return {
    header: item,
    accessorKey: item,
    size: getTextWidth(item) + 40,
    footer: (props) => {
      props.column.id;
    },
  };
});

function App() {
  const [columns] = useState(() => [...defaultColumns]);
  const [data, setData] = useState(() => [...users]);

  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columnResizeMode: "onChange",
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              const current = old[rowIndex];
              return {
                ...current,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <div className="p-2">
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="table-container">
          <div
            className="table"
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <div className="header">
              {table.getHeaderGroups().map((headerGroup) => (
                <div className="tr" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <div
                      className="th"
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
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className="tbody"
              style={{ width: "100%", overflowX: "scroll" }}
            >
              {table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  className={`tr ${
                    row.index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <div
                        className="td"
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
                      </div>
                    );
                  })}
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
