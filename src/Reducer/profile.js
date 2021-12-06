var profile = (state = { avatar: "" }, action) => {
  switch (action.type) {
    case "GET_AVATAR":
      return {
        ...state,
        avatar: action.avatar,
      };
    case "SIGN_OUT": //dang xuat
      return {
        ...state,
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      };
    default:
      return state;
  }
};

export default profile;
