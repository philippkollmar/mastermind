const colors = require("./colors")

const pickColor = (randomFn) => {
    const randomValue = randomFn();
    if(randomValue < 0.125) {
        return colors.RED
    } else if(randomValue >= 0.125 && randomValue < 0.25) {
        return colors.GREEN
    } else if(randomValue >= 0.25 && randomValue < 0.375) {
        return colors.YELLOW
    } else if(randomValue >= 0.375 && randomValue < 0.5) {
        return colors.BLUE
    } else if(randomValue >= 0.5 && randomValue < 0.625) {
        return colors.PURPLE
    } else if(randomValue >= 0.625 && randomValue < 0.75) {
        return colors.ORANGE
    } else if(randomValue >= 0.75 && randomValue < 0.875) {
        return colors.PINK
    } else if(randomValue >= 0.875 && randomValue < 1) {
        return colors.BROWN
    }
    throw new Error('Invalid Random')
    
}

module.exports = {
    pickColor
}