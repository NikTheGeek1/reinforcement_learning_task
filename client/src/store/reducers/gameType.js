import { CHANGE_TYPE } from '../actions/gameType';

const initialState = {
    gameType: 'valueIteration'
};

export default (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_TYPE:
            return { gameType: action.gameType };

        default:
            return state;
    }
}