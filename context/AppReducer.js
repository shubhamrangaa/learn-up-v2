const AppReducer = (state, action) => {
  console.log("in reducer");

  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };

    case "DELETE_USER":
      return { ...state, user: null };

    default:
      return state;
  }
};

export default AppReducer;
