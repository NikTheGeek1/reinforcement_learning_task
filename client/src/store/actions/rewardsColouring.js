export const TOGGLE_OPTION = ' TOGGLE_OPTION';

export const toggleColouringOption = (option, checked) => {
    return { type: TOGGLE_OPTION, option: option, checked: checked };
};