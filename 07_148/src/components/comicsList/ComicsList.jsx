import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Spinner from '../spinner/Spinner';
import { useMarvelService } from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './comicsList.scss';
import { API_KEY } from '../../constants/constants';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(10);
  const {loading, error, getAllComics} = useMarvelService(API_KEY);
  
  useEffect(() => {
    updateComics();
  }, [])


  const onLoadMore = () => {
    getAllComics(currentOffset + 8)
      .then((newComics) => {
        setComics(comics => comics.concat(newComics));
      })
      .then(() => {
        setCurrentOffset(currentOffset => currentOffset + 8);
      })
  }

  const updateComics = () => {
    getAllComics(currentOffset)
      .then(comics => setComics(comics));
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <View comics={comics} /> : null;

  

  return (
    <div className="comics__list">
      <ul className="comics__grid">
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


const View = ({comics}) => {
  if (Object.keys(comics).length === 0) return (<></>);
  return comics.map((comic, i) => {
    const {id, title, thumbnail, price} = comic;
    return (
      <li key={id + "_" + i} className="comics__item">
        <Link to={"/comics/" + id}>
          <img src={thumbnail} alt={title} className="comics__item-img"/>
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">{price}</div>
        </Link>
      </li>
    )
  })
}

export default ComicsList;