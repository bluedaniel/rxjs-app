import { compose, set, lensProp } from 'core/utils';

export const searchStore = {
  defaultState () {
    return {
      searchResults: []
    };
  },
  updateResults (searchResults) {
    return compose(set(lensProp('searchStore'), { searchResults }));
  }
};
