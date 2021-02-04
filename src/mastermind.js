const colors = require("./colors");
const hint = require("./hint");
const {NOT_AT_ALL, PARTIALLY, FITS} = require("./hint");
const game = require("./game");
const { BLUE } = require("./colors");

function randomFn() {
    return Math.random();
}

const pickColor = (randomFn) => {
    const randomValue = randomFn();
    
    if (randomValue < 0.125) {
        return colors.RED
    } else if (randomValue >= 0.125 && randomValue < 0.25) {
        return colors.GREEN
    } else if (randomValue >= 0.25 && randomValue < 0.375) {
        return colors.YELLOW
    } else if (randomValue >= 0.375 && randomValue < 0.5) {
        return colors.BLUE
    } else if (randomValue >= 0.5 && randomValue < 0.625) {
        return colors.PURPLE
    } else if (randomValue >= 0.625 && randomValue < 0.75) {
        return colors.ORANGE
    } else if (randomValue >= 0.75 && randomValue < 0.875) {
        return colors.PINK
    } else if (randomValue >= 0.875 && randomValue < 1) {
        return colors.BROWN
    } 
    throw new Error('Invalid Random')

}

const generateCode = (randomFn) => {
    const colorArray = [
        colors.RED, 
        colors.GREEN, 
        colors.YELLOW, 
        colors.BLUE, 
        colors.PURPLE, 
        colors.ORANGE, 
        colors.PINK, 
        colors.BROWN
    ]

    let color1 = colorArray[Math.floor(randomFn()*colorArray.length)]
    //Array verkleinern und aus neuem Array Farbe picken
    var filteredArray1 = colorArray.filter(function(e) { return e !== color1 })
    let color2 = filteredArray1[Math.floor(randomFn()*filteredArray1.length)]

    var filteredArray2 = filteredArray1.filter(function(e) { return e !== color2 })
    let color3 = filteredArray2[Math.floor(randomFn()*filteredArray2.length)]

    var filteredArray3 = filteredArray2.filter(function(e) { return e !== color3 })
    let color4 = filteredArray3[Math.floor(randomFn()*filteredArray3.length)]

    const code = [color1, color2, color3, color4]
    console.log(code)
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
    console.log(win)
    if (String(progress) === String(win) && rounds <= 12) {
        return game.WON;
    }
    else if (String(progress).includes('NOT_AT_ALL') && rounds >= 12) {
        return game.LOST;
    }
    else if (String(progress).includes('PARTIALLY') && rounds >= 12) {
        return game.LOST;
    }
    else {
        return game.PENDING;
    }

}


module.exports = {
    pickColor, generateCode, checkCode, checkGame, randomFn
}