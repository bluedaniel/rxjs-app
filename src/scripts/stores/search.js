
export const searchStore = {
  defaultState () {
    return {
      searchResults: []
    };
  },
  updateResults (searchResults) {
    return state =>
      ({ ...state, searchStore: { searchResults } });
  }
};
