export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "type",
    headerName: "Type",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.type}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },

  {
    field: "logs",
    headerName: "Logs",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    type: "humidity",
    img: "./img/humidity.svg",
    status: "online",
    name: "Garden Humidity",
    logs: 35,
  },
  {
    id: 2,
    type: "temperature",
    img: "./img/temp.svg",
    name: "Kitchen Temperature",
    status: "offline",
    logs: 42,
  },
  {
    id: 3,
    type: "light",
    img: "./img/light.svg",
    name: "Living Room Light",
    status: "error",
    logs: 45,
  },
  {
    id: 4,
    type: "proximity",
    img: "/img/proximity.svg",
    name: "Front Door",
    status: "online",
    logs: 16,
  },
  {
    id: 5,
    type: "switch",
    img: "./img/switch.svg",
    name: "Server Killswitch",
    status: "offline",
    logs: 22,
  },
  {
    id: 6,
    type: "switch",
    img: "./img/switch.svg",
    name: "Vent Fan",
    status: "online",
    logs: 15,
  },
  {
    id: 7,
    type: "motor",
    img: "./img/motor.svg",
    name: "Went Fan Speed",
    status: "offline",
    logs: 44,
  },
  {
    id: 8,
    type: "temperature",
    img: "./img/temp.svg",
    name: "Fridge Temperature",
    status: "online",
    logs: 36,
  },
  {
    id: 9,
    type: "temperature",
    img: "./img/temp.svg",
    name: "Outside Temperature",
    status: "error",
    logs: 65,
  },
  {
    id: 10,
    type: "humidity",
    img: "./img/humidity.svg",
    name: "Indoor Humidity",
    status: "online",
    logs: 65,
  },
];
