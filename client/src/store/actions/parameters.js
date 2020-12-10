export const CHANGE_PARAMETER = 'CHANGE_PARAMETER';

export const changeParameter = (algorithm, parameter, value) => {
    return { type: CHANGE_PARAMETER, algorithm: algorithm, parameter: parameter, value: value };
};