var auth = (
  state = { token: "", PhoneNumber: "", FullName: "", isLogin: false },
  action
) => {
  switch (action.type) {
    case "SIGN_IN": //luu thong tin dang nhap
      return {
        ...state,
        isLogin: true,
        token: action.token,
        PhoneNumber: action.PhoneNumber,
        FullName: action.FullName,
      };
    case "SIGN_OUT": //dang xuat
      return {
        ...state,
        token: null,
        isLogin: false,
        PhoneNumber: "",
        FullName:""
      };
    default:
      return state;
  }
};

export default auth;
