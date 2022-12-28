export class Color {
    public r: number
    public g: number
    public b: number
    public a: number

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    scalarAddition = (c: Color, k: number): Color => new Color(c.r + k, c.g + k, c.b + k, c.a + k)
    scalarSubtraction = (c: Color, k: number): Color => new Color(c.r - k, c.g - k, c.b - k, c.a - k)
    scalarMultiplication = (c: Color, k: number): Color => new Color(c.r * k, c.g * k, c.b * k, c.a * k)
    scalarDivision = (c: Color, k: number): Color => new Color(c.r / k, c.g / k, c.b / k, c.a / k)
    add = (a: Color, b: Color): Color => new Color(a.r + b.r, a.g + b.g, a.b + b.b, a.a + b.a)
    subtract = (a: Color, b: Color): Color => new Color(a.r - b.r, a.g - b.g, a.b - b.b, a.a - b.a)
    multiply = (a: Color, b: Color): Color => new Color(a.r * b.r, a.g * b.g, a.b * b.b, a.a * b.a)
    divide = (a: Color, b: Color): Color => new Color(a.r / b.r, a.g / b.g, a.b / b.b, a.a / b.a)
    Lerp(a: Color, b: Color, t: number): Color {
        return new Color(a.r + (b.r - a.r) * t,
            a.g + (b.g - a.g) * t,
            a.b + (b.b - a.b) * t,
            a.a + (b.a - a.a) * t)
    }
}