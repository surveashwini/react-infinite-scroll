export const imgReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_IMAGES":
      return { ...state, images: state.images.concat(action.images) };
    case "FETCH_IMAGES_FROM_SERVER":
      return { ...state, fetching: action.fetching };
    default:
      return state;
  }
};
