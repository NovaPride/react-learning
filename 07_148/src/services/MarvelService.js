import { useHttp } from "../hooks/http.hook";


export const useMarvelService = (apiKey) => {
  const _apiBase = "https://gateway.marvel.com:443/v1/public";
  
  const {request, loading, error, clearError} = useHttp();

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?apikey=${apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }
//https://gateway.marvel.com:443/v1/public/characters?name=tHOr&apikey=b5e8c957f1a227be9d03e55657af0f6d
  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}/characters?name=${name}&apikey=${apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getAllCharacters = async (additionalOffset) => {
    const res = await request(`${_apiBase}/characters?limit=9&offset=${additionalOffset}&apikey=${apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getComic = async (id) => {
		const res = await request(`${_apiBase}/comics/${id}?apikey=${apiKey}`);
		return _transformComics(res.data.results[0]);
	}

  const getAllComics = async (additionalOffset) => {
    const res = await request(`${_apiBase}/comics?limit=8&offset=${additionalOffset}&apikey=${apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
			description: comic.description || "There is no description",
			pageCount: comic.pageCount
				? `${comic.pageCount} p.`
				: "No information about the number of pages",
			language: comic.textObjects[0]?.language || "en-us",
			price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: "NOT AVAILABLE",
    }
  }

  const _transformCharacter = (pers) => {
    if (!pers) return {id: -1}
    return {
      id: pers.id,
      name: pers.name, 
      description: pers.description,
      thumbnail: `${pers.thumbnail.path}.${pers.thumbnail.extension}`,
      homepage: pers.urls[0].url,
      wiki: pers.urls[1].url,
      comics: pers.comics.items,
    }
  }

  return {loading, error, getCharacter, getCharacterByName, getAllCharacters, getComic, getAllComics, clearError}
}