import {combineReducers} from 'redux';
import currentUser, {getCurrentUser} from './currentUser';
import stocks from './stocks';

export {getCurrentUser};

const rootReducer = combineReducers({
  currentUser,
  stocks
});

export default rootReducer;