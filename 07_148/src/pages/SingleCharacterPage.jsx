import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { useMarvelService } from "../services/MarvelService";

import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/errorMessage";
import AppBanner from "../components/appBanner/AppBanner";
import "./singleCharacterPage.scss";
import { API_KEY } from "../constants/constants";

const SingleCharacterPage = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const { loading, error, getCharacter, clearError } =
    useMarvelService(API_KEY);

  useEffect(() => {
    updateComic();
  }, [characterId]);

  const updateComic = () => {
    clearError();
    getCharacter(characterId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setCharacter(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !character) ? (
    <View character={character} />
  ) : null;

  return (
    <>
      <Helmet>
        <meta name="description" content="Information about marvel character" />
        <title>Character information</title>
      </Helmet>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ character }) => {
  const { name, description, thumbnail } = character;

  return (
    <div className="single-character">
      <img src={thumbnail} alt={name} className="single-character__img" />
      <div className="single-character__info">
        <h2 className="single-character__name">{name}</h2>
        <p className="single-character__descr">{description}</p>
      </div>
      <Link to="/" className="single-character__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharacterPage;
