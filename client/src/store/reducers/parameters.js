import { CHANGE_PARAMETER } from '../actions/parameters.js';

const initialState = {
    valueIteration: {
        score: 100,
        steps: 0,
        h: .5,
        l: .2,
        e: .1,
        robotTimeMs: 200
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PARAMETER:
            return {
                ...state,
                [action.algorithm]: {
                    ...state[action.algorithm],
                    [action.parameter]: action.value
                }   
            };

        default:
            return state;
    }
};
