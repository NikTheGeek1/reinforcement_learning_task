import { CHANGE_ALGO_BEHAVIOUR } from '../actions/analyseHumanBehaviour';

const initialState = {
    algoType: 'valueIteration',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ALGO_BEHAVIOUR:
            return { algoType: action.algoType };

        default:
            return state;
    }
};

export default reducer;