
import { combineReducers } from "redux";
import infoPost from './infoPost';
import test from '../Reducer/test';
const reducer = combineReducers({
    test,
    infoPost
});

export default reducer;