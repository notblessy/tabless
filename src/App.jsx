import { Tabless } from "./Component/Tabless";

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
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    email: "jane.smith@example.com",
    phone: "+1987654321",
    city: "Los Angeles",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 35,
    email: "alice.johnson@example.com",
    phone: "+1122334455",
    city: "Chicago",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 4,
    name: "Bob Williams",
    age: 40,
    email: "bob.williams@example.com",
    phone: "+1555666777",
    city: "Houston",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 5,
    name: "Michael Brown",
    age: 28,
    email: "michael.brown@example.com",
    phone: "+1444333222",
    city: "San Francisco",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 6,
    name: "Emma Davis",
    age: 32,
    email: "emma.davis@example.com",
    phone: "+1666777888",
    city: "Seattle",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 7,
    name: "James Wilson",
    age: 45,
    email: "james.wilson@example.com",
    phone: "+1777888999",
    city: "Miami",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    age: 27,
    email: "olivia.martinez@example.com",
    phone: "+1888999000",
    city: "Dallas",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 9,
    name: "William Jones",
    age: 33,
    email: "william.jones@example.com",
    phone: "+1999000111",
    city: "Atlanta",
    adjustment_data_of_employee: "2021-10-10",
  },
  {
    id: 10,
    name: "Sophia Anderson",
    age: 29,
    email: "sophia.anderson@example.com",
    phone: "+1000111222",
    city: "Boston",
    adjustment_data_of_employee: "2021-10-10",
  },
];

const col = Object.keys(users[0]);

const defaultColumns = col.map((item) => {
  return {
    header: item,
    accessorKey: item,
    size: getTextWidth(item) + 20,
    footer: (props) => {
      props.column.id;
    },
  };
});

function App() {
  return (
    <div className="p-2">
      <Tabless rows={users} headers={defaultColumns} />
    </div>
  );
}

export default App;
