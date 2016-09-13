export const globalStore = {
  defaultState () {
    return {
      loading: false,
      loadingText: 'Loading'
    };
  },
  toggleLoading (loading = false, loadingText = 'Loading') {
    return (state) => ({ ...state, globalStore: { loading, loadingText } });
  }
};
