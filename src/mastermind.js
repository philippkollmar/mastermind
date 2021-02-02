const colors = require("./colors");
const hint = require("./hint");
const game = require("./game");

function randomFn() {
    return Math.random();
}

const pickColor = (randomFn) => {
    const randomValue = randomFn();
    if (randomValue < 0.125) {
        color = colors.RED
    } else if (randomValue >= 0.125 && randomValue < 0.25) {
        color = colors.GREEN
    } else if (randomValue >= 0.25 && randomValue < 0.375) {
        color = colors.YELLOW
    } else if (randomValue >= 0.375 && randomValue < 0.5) {
        color = colors.BLUE
    } else if (randomValue >= 0.5 && randomValue < 0.625) {
        color = colors.PURPLE
    } else if (randomValue >= 0.625 && randomValue < 0.75) {
        color = colors.ORANGE
    } else if (randomValue >= 0.75 && randomValue < 0.875) {
        color = colors.PINK
    } else if (randomValue >= 0.875 && randomValue < 1) {
        color = colors.BROWN
    } else if (randomValue > 1 || randomValue < 0) {
        throw new Error('Invalid Random')
    }
    return color;
}

const generateCode = (randomFn) => {
    let color1 = pickColor(randomFn);
    let color2 = pickColor(randomFn);
    let color3 = pickColor(randomFn);
    let color4 = pickColor(randomFn);

    while (color1 === color2 || color1 === color3 || color1 === color4) {
        color1 = pickColor(randomFn);
    }
    while (color2 === color1 || color2 === color3 || color1 === color4) {
        color2 = pickColor(randomFn);
    }
    while (color3 === color1 || color3 === color2 || color3 === color4) {
        color3 = pickColor(randomFn);
    }
    while (color4 === color1 || color4 === color2 || color4 === color3) {
        color4 === pickColor(randomFn);
    }

    const code = [color1, color2, color3, color4]
    return code;
}

const checkCode = (code, guess, randomFn) => {
    const result = []
    let randomValue = randomFn();
    guess.forEach((color, index) => {
        if (color === code[index]) {
            result.push(hint.FITS)
        }
        else if (color === code[0] || color === code[1] || color === code[2] || color === code[3]) {
            result.push(hint.PARTIALLY)
        }
        else {
            result.push(hint.NOT_AT_ALL)
        }
    });

    if (randomValue > 0) {
        let resultcopy = result.slice();
        if (randomValue <= 1) {
            resultcopy[0] = result[1]
            resultcopy[1] = result[3]
            resultcopy[2] = result[2]
            resultcopy[3] = result[0]
        }
        else if (randomValue <= 2) {
            resultcopy[0] = result[0]
            resultcopy[1] = result[2]
            resultcopy[2] = result[3]
            resultcopy[3] = result[1]
        }
        else if (randomValue <= 3) {
            resultcopy[0] = result[1]
            resultcopy[1] = result[0]
            resultcopy[2] = result[2]
            resultcopy[0] = result[3]
        };
        return resultcopy;

    }
    else if (randomValue < 0) {
        throw new Error('Invalid Random');
    }
    else {
        return result;
    }
}

function checkGame(checkCode, rounds) {
    let progress = checkCode;
    let win = [hint.FITS, hint.FITS, hint.FITS, hint.FITS]

    if (JSON.stringify(progress) === JSON.stringify(win) && rounds <= 12) {
        return game.WON;
    }
    else if (progress.includes(hint.NOT_AT_ALL) && rounds >= 12) {
        return game.LOST;
    }
    else if (progress.includes(hint.PARTIALLY) && rounds >= 12) {
        return game.LOST;
    }
    else {
        return game.PENDING;
    }

}


module.exports = {
    pickColor, generateCode, checkCode, checkGame, randomFn
}