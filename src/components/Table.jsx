import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 30 },
  { field: "timestamp", headerName: "Time Stamp", width: 120 },
  { field: "level", headerName: "Level", width: 130 },
  { field: "component", headerName: "Component", width: 130 },
  { field: "host", headerName: "Host", width: 150 },
  { field: "requestid", headerName: "Request ID", width: 150 },
  { field: "message", headerName: "Message", width: 150 },
];
// const fetchLogData = () => {
//   axios
//     .get("http://localhost:8080/", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then(function (response) {
//       // handle success
//       console.log(response);
//       setLogData(response.data);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });
//   useEffect(() => {
//     fetchLogData();
//   }, []);
// };
const rows = [
  //{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  {
    id: 1,
    timestamp: "mnvjkd",
    level: "INFO",
    component: "worker",
    host: "web01",
    requestid: "jh<gfjdb",
    message: "jdhfgjds",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
