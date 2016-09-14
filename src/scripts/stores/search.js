import { compose, over, lensProp } from 'core/utils';

export const searchStore = {
  defaultState () {
    return {
      searchResults: []
    };
  },
  updateResults (searchResults) {
    return compose(over(lensProp('searchStore'), () => ({ searchResults })));
  }
};
