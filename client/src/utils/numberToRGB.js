export const hslToRgb = (h, s, l) => {
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

/**
 * Convert a number to a color using hsl, with range definition.
 * Example: if min/max are 0/1, and i is 0.75, the color is closer to green.
 * Example: if min/max are 0.5/1, and i is 0.75, the color is in the middle between red and green.
 * @param i (floating point, range 0 to 1)
 * param min (floating point, range 0 to 1, all i at and below this is red)
 * param max (floating point, range 0 to 1, all i at and above this is green)
 */
export const numberToColorHsl = (num, min_range, max_range, min, max) => {
    if ((num > -0.01 && num < 0.01)) {
        return 'rgb(0, 0, 0)';
    }
    const i = rescale0to1(num, min_range, max_range);
    var ratio = i;
    if (min > 0 || max < 1) {
        if (i < min) {
            ratio = 0;
        } else if (i > max) {
            ratio = 1;
        } else {
            var range = max - min;
            ratio = (i - min) / range;
        }
    }

    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = ratio * 1.2 / 3.60;
    //if (minMaxFactor!=1) hue /= minMaxFactor;
    //console.log(hue);

    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}


export const rescale0to1 = (num, minNew, maxNew, minOld, maxOld) => {
    return (maxNew - minNew) / (maxOld - minOld) * (num - maxOld) + maxNew;
}

export const rewardToColor = (reward, initialReward, finishReward, trapPenalty, startingColorNum, endingColorNum) => {
    let squareColor = 'rgb(16, 16, 16)';
    if (reward > initialReward + 0.001) {
        const greenColor = rescale0to1(
            reward,
            startingColorNum,
            endingColorNum,
            initialReward,
            finishReward
        );
        squareColor = `rgb(0, ${greenColor}, 0)`;
    } else if (reward < initialReward - 0.001) {
        const redColor = rescale0to1(
            Math.abs(reward),
            startingColorNum,
            endingColorNum,
            initialReward,
            Math.abs(trapPenalty)
        );
        squareColor = `rgb(${redColor}, 0, 0)`;
    }
    return squareColor;
}