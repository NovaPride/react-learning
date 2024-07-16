const initialState = {
  value: [],
  loadingStatus: "idle",
  currentFilter: "",
}

const elements = (state = initialState, action) => {
  switch (action.type) {
    case "ELEMENTS_FETCHING":
      return {
        ...state,
        loadingStatus: "loading"
      }
    case "ELEMENTS_FETCHED":
      return {
        ...state,
        value: action.payload,
        loadingStatus: "idle"
      }
    case "ELEMENTS_FETCHING_ERROR":
      return {
        ...state,
        loadingStatus: "error"
      }
    case "FILTER_CHANGE":
      return {
        ...state,
        currentFilter: action.payload
      }
    default: return state
  }
}

export default elements;