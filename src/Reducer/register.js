var newuser = (
  state = { username: "", phonenumber: "", password: "", verificationId: "" },
  action
) => {
  switch (action.type) {
    case "REGISTER_OTP":
      return {
        ...state,
        username: action.username,
        phonenumber: action.phonenumber,
        password: action.password,
        verificationId: action.verificationId,
      };
    case "RESET_PASSWORD":
      return {
        ...state,
        phonenumber: action.phonenumber,
      };
    default:
      return state;
  }
};

export default newuser;
