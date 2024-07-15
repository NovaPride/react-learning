import { useEffect } from "react";
import { useSelector } from "react-redux";

import useDatabase from "../../service/useDatabase";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const heroes = useSelector((state) => state.heroes);
  const heroesLoadingStatus = useSelector((state) => state.heroesLoadingStatus);
  const { fetchHeroes } = useDatabase();

  useEffect(() => {
    fetchHeroes();
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Памылка запампоўваньня</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Герояў пакуль няма</h5>;
    }
    return arr.map((props) => {
      return (
        <HeroesListItem key={props.id} fetchHeroes={fetchHeroes} {...props} />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
