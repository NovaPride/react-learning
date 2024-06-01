import errorGif from "./error.gif";

const ErrorMessage = () => {
  return (
    <img src={errorGif} alt="errorgif" style={{ display: "block", width: "250px", height: "250px", objectFit: "contain", margin: "0 auto" }}/>
  )
}

export default ErrorMessage;