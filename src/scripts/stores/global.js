import { compose, over, lensProp } from 'core/utils';

export const globalStore = {
  defaultState () {
    return {
      loading: false,
      loadingText: 'Loading'
    };
  },
  toggleLoading (loading = false, loadingText = 'Loading') {
    return compose(over(lensProp('globalStore'), () => ({ loading, loadingText })));
  }
};
