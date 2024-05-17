import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css"

const data = [
  { id: 1, name: "John Doe", salary: 300, increase: true},
  { id: 2, name: "Alex Hirch", salary: 999 },
  { id: 3, name: "Maryarty", salary: 1200, increase: true },
  { id: 4, name: "Piter"},
  { id: 5, name: "Brzyczyshkevich", salary: 666 }
];

function App(){
  return (
    <div className="app">
      <AppInfo/>
      <div className="search-panel">
        <SearchPanel/>
        <AppFilter/>
      </div>
      <EmployeesList data={data}/>
      <EmployeesAddForm/>
    </div>
  );
}

export default App