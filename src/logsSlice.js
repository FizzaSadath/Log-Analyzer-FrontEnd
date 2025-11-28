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
          startTime: filters.startTime ?? "",
          endTime: filters.endTime ?? "",
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
    startTime: "",
    endTime: "",
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
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 0; // reset
    },
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
