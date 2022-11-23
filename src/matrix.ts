// type Array2D = number[][] | undefined[][]

// export class matrix {
//     private cols: Array2D
//     private rows: Array2D
//     public readonly height: number
//     public readonly width: number
// }
export class Matrixs {
    private cols: number
    private rows: number
    private data: number[][]
    constructor(rows: number, cols: number, data?: number[][]) {
        this.rows = rows
        this.cols = cols
        this.data = new Array<number[]>(this.rows).fill([]).map(() => new Array<number>(this.cols).fill(0))

        if (data) this.data = data
    }
    get _rows() {
        return this.rows
    }
    get _cols() {
        return this.cols
    }
    get _data() {
        return this.data
    }
    set values(newValues: number[][]) {
        const minRow = Math.min(newValues.length, this.rows);
        const minCol = Math.min(newValues[0].length, this.cols);
        for (let r = 0; r < minRow; r++) {
            for (let c = 0; c < minCol; c++) {
                this.data[r][c] = newValues[r][c];
            }
        }
    }
    setAsIdentity() {
        if (this.rows !== this.cols) throw new Error("Dimension error! The matrix isn't squared!");
        this.data.forEach((row, i) => {
            row.forEach((_, j) => {
                this.data[i][j] = i === j ? 1 : 0;
            });
        });
        return this;
    }
    static identity(dimension: number): Matrixs {
        if (dimension < 1) throw Error('Dimension error! Matrix dimension must be positive.');
        return new Matrixs(dimension, dimension).setAsIdentity();
    }
}

export interface IMatrix {
    rows: number
    cols: number
    data: number[][]
}


// let rows: number
// let cols: number
// let _data: number[][]

let _data: number[][]
const mat3 = (rows: number, cols: number, data?: number[][]): IMatrix => {
    if (data) {
        _data = data
    }
    return {
        rows,
        cols,
        data: _data = new Array<number[]>(rows).fill([]).map(() => new Array<number>(cols).fill(0))
    }
}
export const matrix = (rows: number, cols: number, data: number[][]): IMatrix => {
    if (data) data

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            data[row][col] = (row << 16) | col
        }
    }
    return {
        rows,
        cols,
        data
    }
}


export const create = (elements = [0, 0, 0, 0, 0, 0, 0, 0, 0]): number[] => {
    // const foo = new Matrixs(3, 3)
    const foo = mat3(5, 4)
    // console.log('matrix', foo);
    // console.log('set identity', foo.setAsIdentity());
    // console.log('dimension of the matrix', Matrixs.identity(3));
    console.log('matrix old', _data);
    // console.log('function matrix', mat3(5, 4));
    console.log('matrix', matrix(5, 4, foo.data));
    console.log('matrix select', foo.data[2][1])

    return elements
}

    // console.log('matrix', _data);