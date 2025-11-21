import DataTable from "./components/Table";
import CheckboxLabels from "./components/FilterOptions";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center gap-10">
      {/* FILTER AREA CENTERED */}
      <div className="w-full max-w-6xl">
        <CheckboxLabels />
      </div>

      {/* TABLE AREA CENTERED */}
      <div className="w-full max-w-6xl">
        <DataTable />
      </div>
    </div>
  );
}

export default App;
