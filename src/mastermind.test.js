const colors = require('./colors');
const { pickColor, generateCode, checkCode } = require('./mastermind');
const hint = require("./hint");

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
            pickColor(() => 1.0)
        }).toThrow()
    })
})
 describe('generateCode', () => {
     it('should return 4 colors based on the randomfunction', () => {
        let count = 0; 
        const fakeRandom = () => {
                count += 1;
                return (0.125-0.001) * count   
         };
         expect(generateCode(fakeRandom)).toEqual([colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE])
        });
 });
 describe('chekCode', () => {
    it('should turn code and guess into hints when all colors diverge', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.PURPLE, colors.ORANGE, colors.PINK, colors.BROWN]
        )).toEqual([hint.NOT_AT_ALL, hint.NOT_AT_ALL, hint.NOT_AT_ALL, hint.NOT_AT_ALL])
    })

    it('should turn code and guess into hints when all colors are equal', () => {
        expect(checkCode(
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE],
            [colors.RED, colors.GREEN, colors.YELLOW, colors.BLUE]
        )).toEqual([hint.FITS, hint.FITS, hint.FITS, hint.FITS])
    })
 });