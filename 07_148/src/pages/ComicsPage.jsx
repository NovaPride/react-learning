import { Helmet } from "react-helmet";

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import ComicsList from "../components/comicsList/ComicsList";
import AppBanner from "../components/appBanner/AppBanner";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page wit our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  );
};

export default ComicsPage;
