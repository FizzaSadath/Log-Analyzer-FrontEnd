import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setFilters } from "../logsSlice";

export default function FilterOptions() {
  const dispatch = useDispatch();

  const [levels, setLevels] = useState([]);
  const [components, setComponents] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [requestId, setRequestId] = useState("");

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeError, setTimeError] = useState("");

  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSearch = () => {
    if (startTime && endTime && new Date(endTime) < new Date(startTime)) {
      setTimeError("End time cannot be earlier than start time.");
      return;
    }

    setTimeError("");
    dispatch(
      setFilters({
        levels,
        components,
        hosts,
        requestId,
        startTime: startTime ? startTime.toISOString() : "",
        endTime: endTime ? endTime.toISOString() : "",
      })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full min-h-screen bg-slate-100 py-10 px-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-black-000 mb-10 tracking-wide">
          LOG ANALYZER
        </h1>

        {/* Filter Box */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-10">
          {/* CENTER ALL FILTERS */}
          <div className="flex flex-wrap gap-10 justify-center">
            {/* Level */}
            <div className="w-64 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
              <h3 className="text-lg font-semibold text-black-000 mb-3">
                Level
              </h3>
              <FormGroup className="space-y-1">
                {["INFO", "ERROR", "DEBUG", "WARN"].map((lvl) => (
                  <FormControlLabel
                    key={lvl}
                    control={
                      <Checkbox
                        checked={levels.includes(lvl)}
                        onChange={() => handleCheckbox(lvl, levels, setLevels)}
                      />
                    }
                    label={lvl}
                  />
                ))}
              </FormGroup>
            </div>

            {/* Component */}
            <div className="w-64 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
              <h3 className="text-lg font-semibold text-black-000 mb-3">
                Component
              </h3>
              <FormGroup className="space-y-1">
                {["api-server", "auth", "cache", "database", "worker"].map(
                  (cmp) => (
                    <FormControlLabel
                      key={cmp}
                      control={
                        <Checkbox
                          checked={components.includes(cmp)}
                          onChange={() =>
                            handleCheckbox(cmp, components, setComponents)
                          }
                        />
                      }
                      label={cmp}
                    />
                  )
                )}
              </FormGroup>
            </div>

            {/* Host */}
            <div className="w-64 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
              <h3 className="text-lg font-semibold text-black-000 mb-3">
                Host
              </h3>
              <FormGroup className="space-y-1">
                {["cache01", "db01", "web01", "web02", "worker"].map((hst) => (
                  <FormControlLabel
                    key={hst}
                    control={
                      <Checkbox
                        checked={hosts.includes(hst)}
                        onChange={() => handleCheckbox(hst, hosts, setHosts)}
                      />
                    }
                    label={hst}
                  />
                ))}
              </FormGroup>
            </div>

            {/* Request ID */}
            <div className="w-64 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
              <h3 className="text-lg font-semibold text-black-000 mb-3">
                Request ID
              </h3>
              <input
                type="text"
                placeholder="req-4leuyy-5910"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:ring-2 focus:ring-purple-300 focus:outline-none h-10"
              />
            </div>

            <div className="flex flex-row gap-6">
              {/* Start Time */}
              <div className="w-72 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
                <h3 className="text-lg font-semibold text-black-000 mb-3">
                  Start Time
                </h3>
                <DateTimePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  value={startTime}
                  onChange={(val) => setStartTime(val)}
                />
              </div>

              {/* End Time */}
              <div className="w-72 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
                <h3 className="text-lg font-semibold text-black-000 mb-3">
                  End Time
                </h3>
                <DateTimePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  value={endTime}
                  onChange={(val) => setEndTime(val)}
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full flex justify-center mt-12">
            <button
              className="px-14 py-3 bg-gray-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all hover:scale-[1.03]"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {timeError && (
        <p className="text-red-600 font-medium mt-2">{timeError}</p>
      )}
    </LocalizationProvider>
  );
}
