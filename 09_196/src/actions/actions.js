export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING"
  }
}

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes
  }
}

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR"
  }
}

export const heroDeletingError = () => {
  return {
    type: "HERO_DELETING_ERROR"
  }
}

export const elementsFetching = () => {
  return {
    type: "ELEMENTS_FETCHING"
  }
}

export const elementsFetched = (elements) => {
  return {
    type: "ELEMENTS_FETCHED",
    payload: elements
  }
}

export const elementsFetchingError = () => {
  return {
    type: "ELEMENTS_FETCHING_ERROR"
  }
}

export const filterChange = (filter) => {
  return {
    type: "FILTER_CHANGE",
    payload: filter
  }
}