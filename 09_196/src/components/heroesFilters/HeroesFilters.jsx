import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterChange } from "../../actions/actions";

import useDatabase from "../../service/useDatabase";

import { changeElementLanguageToKryvianCyrillic } from "../../utils/utils";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements);

  const { fetchElemets, fetchHeroes } = useDatabase();

  useEffect(() => {
    fetchElemets();
  }, []);

  const getButtonColorByItsName = (name) =>
    ({
      fire: "btn-danger",
      water: "btn-primary",
      wind: "btn-success",
      earth: "btn-secondary",
    }[name]);

  const handleClick = ({ target, currentTarget }) => {
    if (target.tagName !== "BUTTON") return;

    for (let i = 0; i < currentTarget.children.length; i++) {
      if (currentTarget.children[i].tagName === "BUTTON") {
        currentTarget.children[i].classList.remove("active");
      }
    }

    target.classList.add("active");
    dispatch(filterChange(target.value));
    fetchHeroes(target.value);
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Адфільтруйце герояў па элементах</p>
        <div className="btn-group" onClick={(e) => handleClick(e)}>
          <button className="btn btn-outline-dark active">Усе</button>
          {elements.map((element, i) => {
            return (
              <button
                key={i}
                value={element}
                className={`btn ${getButtonColorByItsName(element)}`}>
                {changeElementLanguageToKryvianCyrillic(element)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
