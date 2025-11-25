import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [loading, setLoading] = useState(false);

  const fetchPage = () => {
    setLoading(true);
    console.log("Sending to API:", page, pageSize);

    axios
      .get("http://localhost:8080/", {
        params: { page, pageSize },
      })
      .then((res) => {
        const data = res.data.entries.map((e, index) => ({
          id: page * pageSize + index + 1,
          timestamp: e.TimeStamp,
          level: e.Level?.Level,
          component: e.Component?.Component,
          host: e.Host?.Host,
          requestid: e.RequestId,
          message: e.Message,
        }));

        setRows(data);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPage();
  }, [page, pageSize]);

  return (
    <div
      style={{
        height: "600px",
        width: "100%",
        overflow: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        rowCount={total}
        loading={loading}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          console.log("Pagination model changed:", model);
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        pageSizeOptions={[50, 100]}
        columns={[
          { field: "id", headerName: "ID", width: 80 },
          { field: "timestamp", headerName: "Timestamp", width: 180 },
          { field: "level", headerName: "Level", width: 120 },
          { field: "component", headerName: "Component", width: 150 },
          { field: "host", headerName: "Host", width: 150 },
          { field: "requestid", headerName: "Request ID", width: 150 },
          { field: "message", headerName: "Message", width: 300 },
        ]}
      />
    </div>
  );
}
