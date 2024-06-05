import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { Page404, CharactersPage, ComicsPage, SingleComicPage } from "../../pages";


const App = () => { 
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<CharactersPage/>}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;

/* 
{
  {
    "/" : <CharacterPage/>,
    "/comics" : <ComicsPage/>,
  }[window.location.pathname]
} 
*/