import ErrorBoundary from "../components/errorBoundary/ErrorBoundary"
import ComicsList from "../components/comicsList/ComicsList";
import AppBanner from "../components/appBanner/AppBanner";

const ComicsPage = () => {
  return (
    <>
      <AppBanner/>
      <ErrorBoundary>
        <ComicsList/>
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage;