var test = (state = "no", action) => {
    switch (action.type) {
      case "setReload": {
        return "yes";
      }
      case "setNoReload": {
        return "no";
      }
      default:
        return state;
    }
  };
  
  export default test;