import { CHANGE_PARAMETER } from '../actions/parameters.js';

const initialState = {
    valueIteration: {
        score: 100,
        steps: 0,
        h: .5,
        l: .2,
        e: .1,
        robotTimeMs: 200,
        reward: 1,
        penalty: -1,
        initialReward: 1
    },
    qLearning: {
        score: 100,
        steps: 0,
        h: .5,
        a: .2,
        robotTimeMs: 200,
        reward: 1,
        penalty: -1,
        initialReward: 1,
        gamma: .9
    }
};

const reducer = (state = initialState, action) => {
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

export default reducer;
