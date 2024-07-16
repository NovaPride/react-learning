import { useHttp } from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeletingError,
  elementsFetching,
  elementsFetched,
  elementsFetchingError,
} from "../actions/actions";

const useDatabase = () => {
  const __BASE_URI = "http://localhost:3001";
  const dispatch = useDispatch();
  const { request } = useHttp();

  const fetchHeroes = (currentFilter = "") => {
    const url = `${__BASE_URI}/heroes` + (currentFilter ? `?element=${currentFilter}` : ``)
    dispatch(heroesFetching());
    request(url)
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
  }

  const postHero = (heroObj) => {
    request(
      `${__BASE_URI}/heroes`,
      "POST",
      JSON.stringify(heroObj)
    );
  }

  const deleteHero = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(fetchHeroes)
      .catch(() => dispatch(heroDeletingError()))
  }

  const fetchElemets = () => {
    dispatch(elementsFetching());
    request(`${__BASE_URI}/elements`)
      .then((data) => dispatch(elementsFetched(data)))
      .catch(() => dispatch(elementsFetchingError()));
  };

  return { fetchHeroes, postHero, deleteHero, fetchElemets }
}

export default useDatabase;