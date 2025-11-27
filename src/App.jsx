import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogAnalyserUI from "./components/LogAnalyzerUI";
function App() {
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogAnalyserUI />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
