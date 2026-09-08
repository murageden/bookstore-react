import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
    catalog: bookReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;