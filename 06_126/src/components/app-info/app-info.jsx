import "./app-info.css";

const AppInfo = (props) => {
  const {employeesCount, increaseCount} = props;
  return (
    <div className="app-info">
      <h1>Учёт сотрудников в компании N</h1>
      <h2>Общее число сотрудников: {employeesCount}</h2>
      <h2>Премию получат: {increaseCount}</h2>
    </div>
  );
}

export default AppInfo;