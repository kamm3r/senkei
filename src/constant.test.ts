import * as constant from './constants'

describe('constant', () => {
    test('to Degree, 45 values given', () => {
        const deg = constant.toDegree(45)
        expect(parseFloat(deg.toFixed(3))).toBe(2578.310)
    })
    test('to Radian, 45 values given', () => {
        const rad = constant.toRadian(45)
        expect(parseFloat(rad.toFixed(3))).toBe(0.785)
    })
})