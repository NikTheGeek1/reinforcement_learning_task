import { CHANGE_PARAMETER } from '../actions/parameters.js';

const initialState = {
    valueIteration: {
        score: 100,
        steps: 100,
        h: -.1,
        a: .2,
        e: .1,
        robotTimeMs: 200,
        finishReward: 5,
        trapPenalty: -5,
        initialReward: 1
    },
    qLearning: {
        score: 100,
        steps: 100,
        h: -.1,
        a: .2,
        e: .1,
        robotTimeMs: 200,
        finishReward: 1,
        trapPenalty: -1,
        initialReward: 0,
        gamma: .6
    },
    monteCarlo: {
        score: 100,
        steps: 100,
        h: -.1,
        a: .2,
        e: .1,
        robotTimeMs: 200,
        finishReward: 1,
        trapPenalty: -1,
        initialReward: 0,
        gamma: .6
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
