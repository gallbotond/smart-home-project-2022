export const userInputs = [
  {
    id: 1,
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: 2,
    label: "Name and surname",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: 3,
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: 4,
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: 5,
    label: "Password",
    type: "password",
  },
  {
    id: 6,
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: 7,
    label: "Country",
    type: "text",
    placeholder: "USA",
  },
];

export const sensorInputs = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Kitchen Temperature",
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    placeholder: "This sensor logs the temp data",
  },
  {
    id: "category",
    label: "Category",
    type: "radio",
    placeholder: "temperature",
    values: [
      { name: "humidity", img: "./img/humidity.svg" },
      { name: "temperature", img: "./img/temperature.svg" },
      { name: "proximity", img: "./img/proximity.svg" },
      { name: "switch", img: "./img/switch.svg" },
    ],
  },
  {
    id: "initVal",
    label: "Initial value",
    type: "text",
    placeholder: "1",
  },
];
