import Condition from './condition';
import { rows, columns } from './setUpGrid';

export const condition = new Condition(
    {x: columns.length - 1, y: rows.length - 1},
        5,
    [
        {x: 3, y: 7},
        {x: 3, y: 8},
        {x: 7, y: 4},
        {x: 9, y: 7},
        {x: 1, y: 4},
        {x: 1,  y: 3},
        {x: 1,  y: 8},
        {x: 2,  y: 4},
        {x: 2,  y: 9},
        {x: 4,  y: 8},
        {x: 3,  y: 3},
        {x: 6,  y: 9},
        {x: 8,  y: 8},

    ])