import { useEffect } from "react";
import { useSelector } from "react-redux";

import useDatabase from "../../service/useDatabase";

import { changeElementLanguageToKryvianCyrillic } from "../../utils/utils";

const HeroesAddForm = () => {
  // const elements = useSelector((state) => state.elements.value);
  // const elementsLoadingStatus = useSelector(
  //   (state) => state.elements.loadingStatus
  // );

  const { value, loadingStatus } = useSelector((state) => state.elements);
  const elements = value;
  const elementsLoadingStatus = loadingStatus;
  const { fetchHeroes, postHero, fetchElemets } = useDatabase();

  useEffect(() => {
    fetchElemets();
  }, []);

  if (elementsLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Памылка запампоўваньня</h5>;
  }

  const handleSubmit = (e) => {
    let data = [];
    for (let i = 0; i < e.target.elements.length - 1; i++) {
      data.push(e.target.elements[i].value);
    }
    postHero({
      id: crypto.randomUUID(),
      name: data[0] || "Невядомы герой",
      description: data[1] || "Які хаваецца ў цені",
      element: data[2] || "earth",
    });
    fetchHeroes();
    e.preventDefault();
  };

  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={(e) => {
        handleSubmit(e);
      }}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Ім'я новага героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Як мяне зваць?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Апісаньне
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Што я магу?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Абярыце элемент героя
        </label>
        <select required className="form-select" id="element" name="element">
          <SelectOptions elements={elements} />
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Стварыць
      </button>
    </form>
  );
};

const SelectOptions = ({ elements }) => {
  return (
    <>
      {elements.map((element, i) => {
        return (
          <option key={i} value={element}>
            {changeElementLanguageToKryvianCyrillic(element)}
          </option>
        );
      })}
    </>
  );
};

export default HeroesAddForm;
