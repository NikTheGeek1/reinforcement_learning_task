import React from 'react';

import Classes from './ReportFigure.modules.scss';

import Plot from 'react-plotly.js';

const ReportFigure = props => {
    return (
        <div className={Classes.Container}>
            <Plot
                data={[
                    {
                        x: props.x,
                        y: props.y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    }
                ]}
                layout={
                    {
                        width: 500,
                        height: 500
                    }
                }
            />
        </div>
    );
};

export default ReportFigure;