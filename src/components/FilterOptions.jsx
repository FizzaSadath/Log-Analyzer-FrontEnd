import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function FilterOptions() {
  // state variables
  const [levels, setLevels] = useState([]);
  const [components, setComponents] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  // checkbox update logic
  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
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
        {/* Request ID + Timestamp Row */}
        <div className="flex gap-6">
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

          {/* Time Stamp */}
          <div className="w-60 bg-white p-4 rounded-xl shadow border border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Time Stamp</h3>
            <input
              type="text"
              placeholder=">2025-10-23 15:17:42.636"
              value={timeStamp}
              onChange={(e) => setTimeStamp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Search button */}
      <div className="w-full flex justify-center mt-6">
        <button
          className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
          onClick={() => {
            console.log("Filters:", {
              levels,
              components,
              hosts,
              requestId,
              timeStamp,
            });
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
