import "./search-panel.css";

const placeholderText = "Найти сотрудника";

const SearchPanel = () => {
  return (
    <input 
      type="text" 
      className="form-control search-info"
      placeholder = {placeholderText}/>
  );
}

export default SearchPanel;