import React, { useCallback, useEffect, useState } from 'react';

import Classes from './ScoreBoard.module.scss';

/*
plus={false}
minus={false}
finishReward=
trapPenalty=
steps=
score=
*/


const ScoreBoard = props => {
    const [showScore, setShowScore] = useState({ plus: false, minus: false });

    useEffect(() => {
        setShowScore({ plus: props.plus, minus: props.minus });
    }, [props.plus, props.minus]);

    const cleanScore = useCallback((scoreType) => {
        const timer = setTimeout(() => {
            setShowScore({ ...showScore, [scoreType]: false });
            clearTimeout(timer)
        }, 700);
    }, [showScore, setShowScore]);

    let plusScore;
    let minusScore;
    if (showScore.plus) {
        plusScore = <span className={Classes.PlusScore}> {props.finishReward}</span>;
        cleanScore('plus');
    }

    if (showScore.minus) {
        minusScore = <span className={Classes.MinusScore}> {props.trapPenalty}</span>;
        cleanScore('minus')
    }
    return (
        <div className={Classes.Container}>
            <h3>Score Board</h3>
            <hr />
            <div className={Classes.StepsDiv}>
                <p className={Classes.SubText}>Round: {props.round + 1} </p>
            </div>
            <div className={Classes.StepsDiv}>
                <p className={Classes.SubText}>Steps: {props.steps} </p>
            </div>
            <div className={Classes.ScoreDiv}>
                <p className={Classes.SubText}>Score: {props.score}
                    {plusScore} {minusScore}</p>
            </div>
            <hr />
        </div>
    );
};
export default ScoreBoard;