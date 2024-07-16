const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  elements: [],
  elementsLoadingStatus: "idle",
  currentFilter: "",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading"
      }
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle"
      }
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error"
      }
    case "HERO_DELETING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error"
      }
    case "ELEMENTS_FETCHING":
      return {
        ...state,
        elementsLoadingStatus: "loading"
      }
    case "ELEMENTS_FETCHED":
      return {
        ...state,
        elements: action.payload,
        elementsLoadingStatus: "idle"
      }
    case "ELEMENTS_FETCHING_ERROR":
      return {
        ...state,
        elementsLoadingStatus: "error"
      }
    case "FILTER_CHANGE":
      return {
        ...state,
        currentFilter: action.payload
      }
    default: return state
  }
}

export default reducer;