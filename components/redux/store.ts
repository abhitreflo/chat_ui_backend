import { createStore, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import { userState } from './reducers/userReducer';
import userReducer from './reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const makeStore = (context: Context) =>
    createStore(userReducer, composeWithDevTools());
export const wrapper = createWrapper<Store<userState>>(makeStore, {
    debug: false,
});
