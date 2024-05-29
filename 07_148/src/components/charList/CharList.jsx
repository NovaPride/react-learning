import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';
import { abyssImg } from '../../resources/imgFiles';
import { API_KEY } from '../../constants/constants';
/* <li className="char__item char__item_selected">
  <img src={abyssImg} alt="abyss"/>
  <div className="char__name">Abyss</div>
</li> */

export default class CharList extends Component {
  state = {
    chars: {},
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.updateChars();
  }

  marvelService = new MarvelService(API_KEY);

  onCharsLoaded = (chars) => this.setState({chars, loading: false});

  onError = () => this.setState({loading: false, error: true});
  
  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  }

  highlightCard = e => {
    e.currentTarget.childNodes.forEach(card => card.classList.remove("char__item_selected")); 
    if(e.target.dataset.card || e.target.parentElement.dataset.card) {
      const card = e.target.dataset.card ? e.target : e.target.parentElement;
      card.classList.add("char__item_selected")
    }
  } 

  render() {
    const {chars, loading, error} = this.state;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View chars={chars}/> : null;

    return (
      <div className="char__list">
        <ul className="char__grid" onMouseMove={this.highlightCard}>
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

const View = ({chars}) => {
  return chars.map(char => {
    const {id, name, thumbnail} = char;
    return (
      <li key={id} className="char__item" data-card>
        <img src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
      </li>
    );
  })
}