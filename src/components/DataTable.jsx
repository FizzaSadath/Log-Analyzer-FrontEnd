import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setPageSize, fetchLogs } from "../logsSlice";

export default function DataTable() {
  const dispatch = useDispatch();

  const { rows, total, page, pageSize, loading, filters } = useSelector(
    (state) => state.logs
  );

  // Fetch whenever page, pageSize, or filters change
  useEffect(() => {
    dispatch(fetchLogs({ page, pageSize, filters }));
  }, [dispatch, page, pageSize, filters]);

  return (
    <div style={{ height: "600px", width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={rows}
        rowCount={total}
        loading={loading}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          dispatch(setPage(model.page));
          dispatch(setPageSize(model.pageSize));
        }}
        pageSizeOptions={[50, 100]}
        getRowId={(row) => row.id}
        columns={[
          { field: "id", headerName: "ID", width: 80 },
          { field: "timestamp", headerName: "Timestamp", width: 240 },
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
