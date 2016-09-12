export const globalStore = {
  defaultState () {
    return {
      loading: false,
      loadingText: 'Loading'
    };
  },
  toggleLoading (loading = false, loadingText = 'Loading') {
    return (state) =>
      state.mergeIn([ 'globalStore' ], { loading, loadingText });
  }
};
