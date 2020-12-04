
export const rows = [...Array(10).keys()]
export const columns = [...Array(10).keys()]

const squareHeight = 40;
const squareWidth = 40;

const rowWidth = columns.length * squareWidth;
const rowHeight = squareHeight;

const gridHeight = rows.length * rowHeight;
export const gridStyle = {
    width: rowWidth,
    height: gridHeight
}
export const rowStyle = {
    width: rowWidth,
    height: rowHeight
};
export const squareStyle = {
    width: squareHeight,
    height: squareHeight
}