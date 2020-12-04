import { rows, columns } from './setUpGrid';

// for a 10 X 10 grid
export const finishingCoordinates = { x: columns.length - 1, y: rows.length - 1 };
export const trapsCoordinates = [
        { x: 3, y: 7 },
        { x: 3, y: 8 },
        { x: 7, y: 4 },
        { x: 9, y: 7 },
        { x: 1, y: 4 },
        { x: 1, y: 3 },
        { x: 1, y: 8 },
        { x: 2, y: 4 },
        { x: 2, y: 9 },
        { x: 4, y: 8 },
        { x: 3, y: 3 },
        { x: 6, y: 9 },
        { x: 8, y: 8 },
        { x: 6, y: 0 },
        { x: 5, y: 1 },
        { x: 8, y: 2 },
        { x: 8, y: 3 },
        { x: 8, y: 8 },
    ];

// for a 3 x 3 grid
// export const condition = new Condition(
//     { x: columns.length - 1, y: rows.length - 1 },
//     [
//         { x: 1, y: 1},
//     ])

// for a 4 x 4 grid
// export const condition = new Condition(
//     { x: columns.length - 1, y: rows.length - 1 },
//     [
//         { x: 2, y: 1 },
//         { x: 1, y: 3 },
//     ])

// export const finishingCoordinates = { x: columns.length - 1, y: rows.length - 1 };
// export const trapsCoordinates = [
//     { x: 2, y: 1 },
//     { x: 1, y: 3 },
// ];
