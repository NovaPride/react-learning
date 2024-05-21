import { Component } from "react";
import "./employees-add-form.scss";

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
    };
  }

  onValueChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { name, salary } = this.state;
    const { onAdd } = this.props;
    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form className="add-form d-flex">
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Как его зовут?"
            value={name}
            name="name"
            onChange={this.onValueChange}
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="З/П в $?"
            value={salary}
            name="salary"
            onChange={this.onValueChange}
          />

          <button
            onClick={e => {
              e.preventDefault();
              onAdd(name, salary);
            }}
            type="submit"
            className="btn btn-outline-light">
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;
