import React, { useEffect } from 'react';

import Classes from './ReportFigure.modules.scss';

import Plot from 'react-plotly.js';
import Report from '../../models/report';

const report = new Report();
const ReportFigure = props => {
    
    useEffect(() => {
        report.stepsToFinishInRound = report.stepsToFinishInEachRound(props.data.robotHistory, props.data.finishingCoords);   
    });

    return (
        <div className={Classes.Container}>
            <Plot
                data={[
                    {
                        x: report.stepsToFinishInRound.length,
                        y: report.stepsToFinishInRound,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    }
                ]}
                layout={
                    {
                        title: {
                            font: {
                                size: 25,
                                color: 'white',
                            },
                            text: 'Steps to finish in each round'
                        },

                        xaxis: {
                            title: {
                                font: {
                                    size: 22,
                                    color: 'white',
                                },
                                text: 'Round'
                            },
                            tickcolor: 'white',
                            tickfont: {
                                color: 'white',
                                size: 18
                            },
                            showgrid: false
                        },
                        yaxis: {
                            title: {
                                font: {
                                    size: 22,
                                    color: 'white',
                                },
                                text: 'Steps'
                            },
                            tickcolor: 'white',
                            tickfont: {
                                color: 'white',
                                size: 18
                            }
                        },
                        width: 500,
                        height: 500,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)'
                    }
                }
            />
        </div>
    );
};

export default ReportFigure;