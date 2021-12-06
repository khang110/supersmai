
import { combineReducers } from "redux";
import infoPost from './infoPost';
import test from '../Reducer/test';
import dataFilter from '../Reducer/dataFilter';
import typeUpPost from './typeUpPost';
import register from "./register";
import auth from "./authentication";
import profile from "./profile";
const reducer = combineReducers({
  test,
  infoPost,
  dataFilter,
  typeUpPost,
  auth,
  register,
  profile
});

export default reducer;