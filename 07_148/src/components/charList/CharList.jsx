import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';
import { API_KEY } from '../../constants/constants';


export default class CharList extends Component {
  state = {
    chars: {},
    loading: true,
    error: false,
    currentOffset: 210,
  }

  componentDidMount() {
    this.updateChars();
  }

  marvelService = new MarvelService(API_KEY);

  onCharsLoaded = (chars) => this.setState({chars, loading: false});

  onError = () => this.setState({loading: false, error: true});
  
  onCharLoading = () => {
    this.setState({loading: true})
  }

  onLoadMore = async () => {
    await this.setState(
      ({currentOffset}) => { 
        return {currentOffset: currentOffset + 9}
      });
    this.marvelService
      .getAllCharacters(this.state.currentOffset)
      .then((newChars) => {
        this.setState(({chars}) => { 
          return {
            chars: chars.concat(newChars),
            loading: false
        }});
        return newChars;
      })
      .catch(this.onError);
  }

  updateChars = () => {
    this.marvelService
      .getAllCharacters(this.state.currentOffset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  }

  highlightCard = e => {
    e.currentTarget.childNodes.forEach(card => card.classList.remove("char__item_hovered")); 
    if(e.target.dataset.card || e.target.parentElement.dataset.card) {
      const card = e.target.dataset.card ? e.target : e.target.parentElement;
      card.classList.add("char__item_hovered")
    }
  } 

  render() {
    const {chars, loading, error} = this.state;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View chars={chars} onCharSelected={this.props.onCharSelected}/> : null;

    return (
      <div className="char__list">
        <ul className="char__grid" onMouseMove={this.highlightCard}>
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long" onClick={this.onLoadMore}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

const View = ({chars, onCharSelected}) => {
  return chars.map(char => {
    const {id, name, thumbnail} = char;
    return (
      <li key={id} data-card className="char__item" onClick={() => onCharSelected(id)}>
        <img src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
      </li>
    )
  })
}