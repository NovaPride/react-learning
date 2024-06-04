import './appBanner.scss';
import { avengersImg, avengersLogoImg } from '../../resources/imgFiles';


const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={avengersImg} alt="Avengers"/>
      <div className="app__banner-text">
        New comics every week!<br/>
        Stay tuned!
      </div>
      <img src={avengersLogoImg} alt="Avengers logo"/>
    </div>
  )
}

export default AppBanner;