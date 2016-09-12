
export const searchStore = {
  defaultState () {
    return {
      searchResults: []
    };
  },
  updateResults (searchResults) {
    return state =>
      state.mergeIn([ 'searchStore' ], { searchResults });
  }
};
