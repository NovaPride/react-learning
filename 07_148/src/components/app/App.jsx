import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import { visionImg } from "../../resources/imgFiles";


const App = () => { 
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img className="bg-decoration" src={visionImg} alt="vision" />
      </main>
    </div>
  );
};

export default App;
