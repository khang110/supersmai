
import { combineReducers } from "redux";
import infoPost from './infoPost';
import test from '../Reducer/test';
import dataFilter from '../Reducer/dataFilter';
import typeUpPost from './typeUpPost';
import register from "./register";
const reducer = combineReducers({
  test,
  infoPost,
  dataFilter,
  typeUpPost,
  register,
});

export default reducer;