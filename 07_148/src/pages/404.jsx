import { Helmet } from "react-helmet";

import ErrorMessage from "../components/errorMessage/errorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontSize: "48px" }}>Page does't exist</p>
      <Link
        to="/"
        style={{
          marginTop: "30px",
          color: "#6666ff",
          display: "block",
          textAlign: "center",
          fontSize: "56px",
        }}>
        Back to main page
      </Link>
    </>
  );
};

export default Page404;
