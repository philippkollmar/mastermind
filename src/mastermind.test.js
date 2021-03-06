const colors = require('./colors');
const { pickColor, generateCode, checkCode, checkGame, randomFn } = require('./mastermind');
const hint = require("./hint");
const {FITS, NOT_AT_ALL, PARTIALLY}= require("./hint");
const game = require("./game");

describe ('randomFn', () => {
    it('should be greater than 0', () => {
        expect(randomFn()).toBeGreaterThan(0);
    })
    it('should be less than 1', () => {
        expect(randomFn()).toBeLessThan(1);
    })
})

describe('pickColor', () => {
    it('should take a randomfn and return a color based on that', () => {
        expect(pickColor(() => 0.1)).toEqual(colors.RED);
    });

    [
        { valueRange: 0.125, color: colors.RED },
        { valueRange: 0.25, color: colors.GREEN },
        { valueRange: 0.375, color: colors.YELLOW },
        { valueRange: 0.5, color: colors.BLUE },
        { valueRange: 0.625, color: colors.PURPLE },
        { valueRange: 0.75, color: colors.ORANGE },
        { valueRange: 0.875, color: colors.PINK },
        { valueRange: 1, color: colors.BROWN }
    ].forEach(({ valueRange, color }) => {
        it(`should return ${color} for value in Range of ${valueRange}`, () => {
            expect(pickColor(() => { return valueRange - 0.001 })).toEqual(color)
        })
    })

    it('it should throw on function that return more than 1.0', () => {
        expect(() => {
            pickColor(() => 1.1)
        }).toThrow()
    })
})
describe('generateCode', () => {
    it('should return 4 colors based on the randomfunction', () => {
        let count = 0;
        const fakeRandom = () => {
            count += 1;
            return (0.125 - 0.001) * count
        };
        expect(generateCode(fakeRandom)).toEqual([colors.RED, colors.YELLOW, colors.PURPLE, colors.ORANGE])
    });

});
describe('chekCode', () => {
    it('should turn code and guess into hints when all colors diverge', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.PURPLE, colors.ORANGE, colors.PINK, colors.BROWN],
            () => { }
        )).toEqual([hint.NOT_AT_ALL, hint.NOT_AT_ALL, hint.NOT_AT_ALL, hint.NOT_AT_ALL])
    })

    it('should turn code and guess into hints when all colors are equal', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            () => { }
        )).toEqual([hint.FITS, hint.FITS, hint.FITS, hint.FITS])
    })

    it('should turn code and guess into hints when all colors are partially right', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.GREEN, colors.RED, colors.BLUE, colors.YELLOW],
            () => { }
        )).toEqual([hint.PARTIALLY, hint.PARTIALLY, hint.PARTIALLY, hint.PARTIALLY])
    })

    it('should turn code and guess into hints when some colors are partially right others are right', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.YELLOW, colors.BLUE, colors.GREEN],
            () => { }
        )).toEqual([hint.FITS, hint.PARTIALLY, hint.PARTIALLY, hint.PARTIALLY])
    })

    it('should turn code and guess into hints when some colors are right others are wrong', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.ORANGE, colors.PINK, colors.BROWN],
            () => { }
        )).toEqual([hint.FITS, hint.NOT_AT_ALL, hint.NOT_AT_ALL, hint.NOT_AT_ALL])
    })

    it('should turn code and guess into hints when some colors, partially right , diverged and right', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.YELLOW, colors.ORANGE, colors.GREEN],
            () => { }
        )).toEqual([hint.FITS, hint.PARTIALLY, hint.NOT_AT_ALL, hint.PARTIALLY])
    })

    it(`should countain solutions of result in different positions in random value(1)`, () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.YELLOW, colors.ORANGE, colors.GREEN],
            (_) => { return 1 }
        )).toContain(hint.FITS, hint.PARTIALLY, hint.NOT_AT_ALL)
    })

    it(`should countain solutions of result in different positions in random value(2)`, () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.YELLOW, colors.ORANGE, colors.GREEN],
            (_) => { return 2 }
        )).toContain(hint.FITS, hint.PARTIALLY, hint.NOT_AT_ALL)
    })

    it(`should countain solutions of result in different positions in random value(3)`, () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.YELLOW, colors.ORANGE, colors.GREEN],
            (_) => { return 3 }
        )).toContain(hint.FITS, hint.PARTIALLY, hint.NOT_AT_ALL)
    })
});

describe('checkGame', () => {
    it('should return WON on normal run in under 12 rounds', () => {
        let fakeRounds = 1
        expect(checkGame([FITS,FITS,FITS,FITS],fakeRounds
        )).toEqual(game.WON)
    });

    it("should return LOST when something doesnt fit after round 12", () => {
        let fakeRounds = 12
        expect(checkGame([FITS,PARTIALLY,FITS,NOT_AT_ALL],fakeRounds
        )).toEqual(game.LOST)
    });

    it("should return LOST when NOTHING fits after round 12", () => {
        let fakeRounds = 12
        expect(checkGame(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.ORANGE, colors.BROWN, colors.PINK, colors.PURPLE],
            (_) => { }),
            fakeRounds
        )).toEqual(game.LOST)
    });

    it("should return LOST when everything ist PARTIALLY after round 12", () => {
        let fakeRounds = 12
        expect(checkGame(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.GREEN, colors.RED, colors.BLUE, colors.YELLOW],
            (_) => { }),
            fakeRounds
        )).toEqual(game.LOST)
    });

    it("should return PENDING when round is under 12 and something doesnt fit", () => {
        let fakeRounds = 5
        expect(checkGame([FITS,PARTIALLY,FITS,FITS],fakeRounds
        )).toEqual(game.PENDING)
    });



}) 