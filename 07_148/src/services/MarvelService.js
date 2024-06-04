import { useHttp } from "../hooks/http.hook";


export const useMarvelService = (apiKey) => {
  const _apiBase = "https://gateway.marvel.com:443/v1/public";
  
  const {request, loading, error, clearError} = useHttp();

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?apikey=${apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getAllCharacters = async (additionalOffset) => {
    const res = await request(`${_apiBase}/characters?limit=9&offset=${additionalOffset}&apikey=${apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const _transformCharacter = (pers) => {
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

  return {loading, error, getCharacter, getAllCharacters, clearError}
}