import { compose, set, lensProp } from 'core/utils';

export const globalStore = {
  defaultState () {
    return {
      loading: false,
      loadingText: 'Loading'
    };
  },
  toggleLoading (loading = false, loadingText = 'Loading') {
    return compose(set(lensProp('globalStore'), { loading, loadingText }));
  }
};
