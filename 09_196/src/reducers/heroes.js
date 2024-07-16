const initialState = {
  value: [],
  loadingStatus: "idle",
}

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        loadingStatus: "loading"
      }
    case "HEROES_FETCHED":
      return {
        ...state,
        value: action.payload,
        loadingStatus: "idle"
      }
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        loadingStatus: "error"
      }
    case "HERO_DELETING_ERROR":
      return {
        ...state,
        loadingStatus: "error"
      }
    default: return state
  }
}

export default heroes;