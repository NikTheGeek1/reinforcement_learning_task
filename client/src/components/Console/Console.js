import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Classes from './Console.module.scss';

import { changeType } from '../../store/actions/gameType';
import { changeAlgoBehaviour } from '../../store/actions/analyseHumanBehaviour';

const Console = props => {
    const dispatch = useDispatch();
    const selectElement = useRef();
    const selectAlgo = useRef();
    const gameTypeState = useSelector(state => state.gameType);
    const analyseHumanBehaviourState = useSelector(state => state.behaviourAlgo);
    
    const selectGameTypeHandler = type => {
        selectElement.current.blur();
        dispatch(changeType(type.target.value));
    };

    const seleectAlgoGameTypeHandler = type => {
        selectAlgo.current.blur();
        dispatch(changeAlgoBehaviour(type.target.value));
    };

    return (
        <div className={Classes.Container}>
            <div className={Classes.GameType}>
                <label htmlFor="gameType">Select Mode: </label>
                <select defaultValue={gameTypeState.gameType} ref={selectElement} name="gameType" id="gameType" onChange={selectGameTypeHandler}>
                    <option value="valueIteration">Value iteration</option>
                    <option value="human">Play the game</option>
                    <option value="qLearning">Q-Learning</option>
                </select>
            </div>
            {props.human &&
                <div className={Classes.GameType}>
                    <label htmlFor="algoType">Analyse behaviour with: </label>
                    <select defaultValue={analyseHumanBehaviourState.algoType} ref={selectAlgo} name="algoType" id="algoType" onChange={seleectAlgoGameTypeHandler}>
                        <option value="valueIteration">Value iteration</option>
                        <option value="qLearning">Q-Learning</option>
                        <option value="human">None</option>
                    </select>
                </div>
            }
        </div>
    );
};

export default Console;