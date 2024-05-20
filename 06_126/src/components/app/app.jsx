import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, name: "John Doe", salary: 300, increase: false, rise: true },
        {
          id: 2,
          name: "Alex Hirch",
          salary: 999,
          increase: false,
          rise: false,
        },
        { id: 3, name: "Maryarty", salary: 1200, increase: false, rise: false },
        { id: 4, name: "Piter", salary: 1200, increase: true, rise: false },
        {
          id: 5,
          name: "Brzyczyshkevich",
          salary: 666,
          increase: false,
          rise: false,
        },
      ],
      term: "",
      criteria: ""
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return { data: data.filter((e) => e.id !== id) };
    });
  };

  addItem = (name, salary) => {
    if (name === "" || salary === "") return;
    this.setState(({ data }) => {
      return {
        data: data.concat([
          {
            id: data.length + true,
            name: name,
            salary: salary,
            increase: false,
            rise: false,
          },
        ]),
      };
    });
  };

  onToggleIncrease = (id) => {
    this.setState(({ data }) => ({
      data: data.map((e) => {
        if (e.id === id) {
          return { ...e, increase: !e.increase };
        } else {
          return e;
        }
      }),
    }));
  };

  onToggleRise = (id) => {
    this.setState(({ data }) => ({
      data: data.map((e) => {
        if (e.id === id) {
          return { ...e, rise: !e.rise };
        } else {
          return e;
        }
      }),
    }));
  };

  countIncrease = () => {
    return this.state.data.reduce(
      (acc, e) => (e.increase ? acc + true : acc),
      0
    );
  };

  searchEmp = (items, term) => {
    return term.length
      ? items.filter(
          item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        )
      : items;
  };

  onUpdateSearch = (term) => this.setState({term});
  
  updateCriteria = (criteria) => this.setState({criteria});

  render() {
    const { data, term } = this.state;
    const visibleData = this.searchEmp(data, term);
    return (
      <div className="app">
        <AppInfo
          employeesCount={data.length}
          increaseCount={this.countIncrease()}
        />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter updateCriteria={this.updateCriteria}/>
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
