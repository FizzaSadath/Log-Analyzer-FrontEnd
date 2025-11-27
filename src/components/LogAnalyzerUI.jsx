import DataTable from "./DataTable";
import FilterOptions from "./FilterOptions";
function LogAnalyserUI() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center gap-10">
      <div className="w-full max-w-6xl">
        <FilterOptions />
      </div>

      <div className="w-full max-w-6xl">
        <DataTable />
      </div>
    </div>
  );
}

export default LogAnalyserUI;
