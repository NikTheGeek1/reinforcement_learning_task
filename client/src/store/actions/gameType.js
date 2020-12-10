export const CHANGE_TYPE = 'CHANGE_TYPE';


export const GAME_TYPE_OPTIONS = {
    valueIteration: 'valueIteration',
    human: 'human'
};

export const changeType = type => {
    return { type: CHANGE_TYPE, gameType: type };
};