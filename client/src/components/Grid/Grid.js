import React from 'react';
import { rowStyle, squareStyle } from '../../models/setUpGrid';

import Classes from './Grid.module.scss';
import ClassesMovements from './Movements.module.scss';

import robotFig from '../../static/images/human.png';

/*
    PROPS
    rows=
    columns=
    robot=
*/

const Grid = props => {
    
    const grid = props.robot.grid.rows.map(rowY => {
        return (
            <div key={rowY} className={Classes.GameRow} style={rowStyle}>
                {props.robot.grid.columns.map(columnX => {
                    const state = { x: columnX, y: rowY };
                    // LOGIC

                    // square classes
                    let squareClasses = [Classes.GameSquare];
                    // if is visited 
                    props.robot.grid.isVisited(state, props.robot.history).visited && squareClasses.push(Classes.Visited);
                    // if is visited in round
                    props.robot.grid.isVisitedInRound(state, props.robot.history, props.robot.t).visited && squareClasses.push(Classes.VisitedInRound);
                    // if is finishing line AND is finished revealed ??
                    (props.robot.grid.isFinish(state) && props.robot.grid.isVisited(state, props.robot.history).visited) && squareClasses.push(Classes.FinishLine);
                    // if is trap AND is trap revealed ??
                    (props.robot.grid.isTrap(state) && props.robot.grid.isVisited(state, props.robot.history).visited) && squareClasses.push(Classes.Trap);
                    // merge classes
                    squareClasses = squareClasses.join(" ");

                    // robot classes 
                    let showRobot = false;
                    let robotClasses;
                    // if the current state (x,y) is the same as the robot state
                    if (props.robot.isRobotOnState(state)) {
                        showRobot = true;
                        robotClasses = [
                            Classes.Robot, 
                            ClassesMovements[props.robot.state.direction],
                            Classes[props.robot.state.direction] // that's for facing direction
                        ].join(" ");
                    }

                    return (
                        // printing the square
                        <div key={columnX}
                            className={squareClasses}
                            style={squareStyle}>
                            {/* printing the robot */}
                            {showRobot &&
                                <img
                                    className={robotClasses}
                                    src={robotFig} alt="robot_img"
                                />
                            }
                            {/* printing rewards */}
                            { props.rewards &&
                                <span className={Classes.Rewards}>
                                    {props.robot.algorithm.getRewardsIfRobotAround(props.robot.state, state)}
                                    {/* {props.robot.algorithm.rewards_mat[state.x][state.y].toFixed(2)} */}
                                </span>
                            }
                        </div>
                    );

                })}
            </div>
        );
    })
    return (
        grid
    );
};

export default Grid;