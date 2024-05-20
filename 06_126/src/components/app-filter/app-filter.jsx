import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {
  changeActiveButton({target, currentTarget}, props){
    if(target.type !== "button") return;
    console.dir()
    currentTarget.childNodes.forEach(e => {
      e.classList.replace('btn-light', 'btn-outline-light')
    })
    target.classList.replace('btn-outline-light', 'btn-light');
    props.updateCriteria(target.name)
  }

  render() {
    return (
      <div className="btn-group" onClick={e => (this.changeActiveButton(e, this.props))}>
        <button className="btn btn-light" type="button" name="all">
          Все сотрудники
        </button>
        <button className="btn btn-outline-light" type="button" name="increase">
          На повышение
        </button>
        <button className="btn btn-outline-light" type="button" name="rich">
          З/П больше 1000$
        </button>
      </div>
    );
  }
}

export default AppFilter;
