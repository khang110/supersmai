var profile = (state = { avatar: "" }, action) => {
  switch (action.type) {
    case "GET_AVATAR":
      return {
        ...state,
        avatar: action.avatar,
      };
    default:
      return state;
  }
};

export default profile;
