import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import { useMarvelService } from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomChar.scss';
import { unavailableImg, mjolnirImg } from '../../resources/imgFiles';
import { API_KEY } from '../../constants/constants';


const RandomChar = () => {
  const [char, setChar] = useState({});
  const {loading, error, getCharacter, clearError} = useMarvelService(API_KEY);

  useEffect(() => {
    updateChar();
  }, [])


  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  }

  
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <View char={char}/> : null;

  return (
    <>
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main" onClick={updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnirImg} alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
    </>
  )
}

const View = ({char}) => {
  if (Object.keys(char).length === 0) return (<></>);
  const {name, description, thumbnail, homepage, wiki} = char;
  let srcImage = thumbnail ? thumbnail : unavailableImg;
  let descriptionText = description ? (description?.length > 250 ? description.slice(0, 250) + "..." : description) : "[DATA EXPUNGED]";
  let imgStyle = thumbnail.includes("image_not_available") ? {objectFit: "contain"} : null;

  return (
    <div className="randomchar__block">
      <img src={srcImage} alt="Random character" className="randomchar__img" style={imgStyle}/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {descriptionText}  
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;