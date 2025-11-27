// src/features/logs/logsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async ({ page, pageSize, filters }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/",
        {
          levels: filters.levels ?? [],
          components: filters.components ?? [],
          hosts: filters.hosts ?? [],
          requestId: filters.requestId ?? "",
          timeStamp: filters.timeStamp ?? "",
        },
        {
          params: { page, pageSize },
        }
      );

      return {
        entries: res.data.entries,
        total: res.data.total,
        page,
        pageSize,
      };
    } catch (err) {
      // Normalize error
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const initialState = {
  rows: [],
  total: 0,
  page: 0,
  pageSize: 100,
  loading: false,
  error: null,
  filters: {
    levels: [],
    components: [],
    hosts: [],
    requestId: "",
    timeStamp: "",
  },
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    // when filters change, reset page to 0
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 0;
    },
    // optional: set single filter field
    resetFilters(state) {
      state.filters = initialState.filters;
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Map entries to DataGrid-friendly rows here (if needed)
        state.rows = action.payload.entries.map((e, index) => ({
          id: action.payload.page * action.payload.pageSize + index + 1,
          timestamp: e.TimeStamp,
          level: e.Level?.Level,
          component: e.Component?.Component,
          host: e.Host?.Host,
          requestid: e.RequestId,
          message: e.Message,
        }));
        state.total = action.payload.total;
        // keep page/pageSize as they are (already passed)
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { setPage, setPageSize, setFilters, resetFilters } =
  logsSlice.actions;

export default logsSlice.reducer;
