import { useState } from "react";

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary"
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import { visionImg } from "../resources/imgFiles"

const CharactersPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const onCharSelected = (id) => setSelectedChar(id);

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar}/>
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={visionImg} alt="vision" />
    </>
  )
}

export default CharactersPage;