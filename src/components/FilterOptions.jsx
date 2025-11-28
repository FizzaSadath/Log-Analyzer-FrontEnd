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

  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSearch = () => {
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
      <div className="w-full p-6">
        <div className="flex flex-wrap gap-6">
          {/* Level */}
          <div className="w-60 bg-white p-4 rounded-xl shadow border border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Level</h3>
            <FormGroup>
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
          <div className="w-60 bg-white p-4 rounded-xl shadow border border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Component</h3>
            <FormGroup>
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
          <div className="w-60 bg-white p-4 rounded-xl shadow border border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Host</h3>
            <FormGroup>
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
          <div className="w-60 bg-white p-4 rounded-xl shadow border border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Request ID</h3>
            <input
              type="text"
              placeholder="req-4leuyy-5910"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-4">
            {/* Start Time */}
            <div className="w-65 bg-white p-4 rounded-xl shadow border border-gray-300">
              <h3 className="text-lg font-semibold mb-2">Start Time</h3>
              <DateTimePicker
                format="YYYY-MM-DD HH:mm:ss"
                value={startTime}
                onChange={(val) => setStartTime(val)}
              />
            </div>

            {/* End Time */}
            <div className="w-65 bg-white p-4 rounded-xl shadow border border-gray-300">
              <h3 className="text-lg font-semibold mb-2">End Time</h3>
              <DateTimePicker
                format="YYYY-MM-DD HH:mm:ss"
                value={endTime}
                onChange={(val) => setEndTime(val)}
              />
            </div>
          </div>
        </div>

        {/* Search button */}
        <div className="w-full flex justify-center mt-6">
          <button
            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
