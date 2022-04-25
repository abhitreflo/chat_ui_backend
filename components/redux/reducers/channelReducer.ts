import { channelConstant } from '../constants/channelConstants';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

export interface channelState {
    loading: boolean;
    error: string | null;
    data: string[];
}

const initialState: channelState = {
    loading: false,
    error: null,
    data: [],
};

const channelReducer = (
    state: channelState = initialState,
    action: AnyAction
): channelState => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        case channelConstant.CHANNEL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                data: [],
            };
        case channelConstant.CHANNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            };
        case channelConstant.CHANNEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: [],
            };
        default:
            return state;
    }
};

export default channelReducer;
