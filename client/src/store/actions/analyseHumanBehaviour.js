export const CHANGE_ALGO_BEHAVIOUR = 'CHANGE_ALGO_BEHAVIOUR';


export const changeAlgoBehaviour = type => {
    return { type: CHANGE_ALGO_BEHAVIOUR, algoType: type };
};