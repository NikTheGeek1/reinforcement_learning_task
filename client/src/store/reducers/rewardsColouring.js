import { TOGGLE_OPTION } from '../actions/rewardsColouring';

const initialState = {
    showColourShadowing: false,
    showRewards: true
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_OPTION:
            return { ...state, [action.option]: action.checked };
        default:
            return state;
    }
};


export default reducer;