import { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import { visionImg } from "../../resources/imgFiles";


export default class App extends Component { 
  state = {
    selectedChar: null,
  }

  onCharSelected = (id) => {
    this.setState({selectedChar: id});
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={visionImg} alt="vision" />
        </main>
      </div>
    );
  }
};