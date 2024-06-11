import { useState } from "react";
import { Helmet } from "react-helmet";

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import CharSearch from "../components/charSearch/charSearch";

import { visionImg } from "../resources/imgFiles";

const CharactersPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = (id) => setSelectedChar(id);

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className="char__rightpanel">
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearch />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={visionImg} alt="vision" />
    </>
  );
};

export default CharactersPage;
