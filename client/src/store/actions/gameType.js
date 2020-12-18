export const CHANGE_TYPE = 'CHANGE_TYPE';


export const GAME_TYPE_OPTIONS = {
    human: 'human',
    valueIteration: 'valueIteration',
    qLearning: 'qLearning',
    monteCarlo: 'monteCarlo'
};

export const changeType = type => {
    return { type: CHANGE_TYPE, gameType: type };
};