export const pageReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_NEW_DATA":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};
