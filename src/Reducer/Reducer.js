
import { combineReducers } from "redux";
import infoPost from './infoPost';
import test from '../Reducer/test';
import dataFilter from '../Reducer/dataFilter';
const reducer = combineReducers({
    test,
    infoPost,
    dataFilter,
});

export default reducer;