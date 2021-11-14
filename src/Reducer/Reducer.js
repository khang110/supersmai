
import { combineReducers } from "redux";
import infoPost from './infoPost';
import test from '../Reducer/test';
import dataFilter from '../Reducer/dataFilter';
import typeUpPost from './typeUpPost';
const reducer = combineReducers({
    test,
    infoPost,
    dataFilter,
    typeUpPost,
});

export default reducer;