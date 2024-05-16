import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


// const elem = <h2>Hello World</h2>;

// const politeMessage = "Hello World";

// const elem = (
//   <div>
//     <h2>{politeMessage}{JSON.stringify(new Date())}</h2>
//     <input type="text" />
//     <button/>
//   </div>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);

