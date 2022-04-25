import { combineReducers } from 'redux';
import userReducer from './channelReducer';

const reducers = combineReducers({
    AllUser: userReducer,
});

export default reducers;
// export type RootState = ReturnType<typeof reducers>;
