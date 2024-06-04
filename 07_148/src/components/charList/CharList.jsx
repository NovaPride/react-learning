import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import { useMarvelService } from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';
import { API_KEY } from '../../constants/constants';


const CharList = (props) => {
  const [chars, setChars] = useState({});
  const [currentOffset, setCurrentOffset] = useState(210);
  const {loading, error, getAllCharacters} = useMarvelService(API_KEY);
  
  useEffect(() => {
    updateChars();
  }, [])


  const onLoadMore = () => {
    getAllCharacters(currentOffset + 9)
      .then((newChars) => {
        setChars(chars => chars.concat(newChars));
      })
      .then(() => {
        setCurrentOffset(currentOffset => currentOffset + 9);
      })
  }

  const updateChars = () => {
    getAllCharacters(currentOffset)
      .then(chars => setChars(chars));
  }

  const highlightCard = e => {
    e.currentTarget.childNodes.forEach(card => card.classList.remove("char__item_hovered")); 
    if(e.target.dataset.card || e.target.parentElement.dataset.card) {
      const card = e.target.dataset.card ? e.target : e.target.parentElement;
      card.classList.add("char__item_hovered")
    }
  } 

  
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <View chars={chars} onCharSelected={props.onCharSelected}/> : null;

  return (
    <div className="char__list">
      <ul className="char__grid" onMouseMove={highlightCard}>
        {errorMessage}
        {spinner}
        {content}
      </ul>
      <button className="button button__main button__long" onClick={onLoadMore}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

const View = ({chars, onCharSelected}) => {
  if (Object.keys(chars).length === 0) return (<></>);
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

export default CharList;