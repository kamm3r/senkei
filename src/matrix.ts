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

        if (data) {
            this.data = data
        }
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
                this.values[r][c] = newValues[r][c];
            }
        }
    }
    at(row: number, col: number): number {
        return this.values[row][col];
    }
    reset(): void {
        this.values.map((row) => row.map(() => 0));
    }
    addAColumn(): Matrixs {
        return new Matrixs(this.rows, this.cols + 1, this.values);
    }
    addARow(): Matrixs {
        return new Matrixs(this.rows + 1, this.cols, this.values);
    }
    equals(mat: Matrixs): boolean {
        // Reduce on rows -> reduce on columns -> if a value != then false!
        return (this.rows === mat.rows && this.cols === mat.cols)
            && this.values.reduce(// Rows
                (eql: boolean, row, i) => eql && row.reduce(// Columns (real values)
                    (eql2: boolean, val, j) => eql2 && mat.at(i, j) === val, eql)
                , true);
    }
    setAsIdentity() {
        if (this.rows !== this.cols) throw new Error("Dimension error! The matrix isn't squared!");
        this.data.forEach((row, i) => {
            row.forEach((_, j) => {
                this.values[i][j] = i === j ? 1 : 0;
            });
        });
        return this;
    }
    static identity(dimension: number): Matrixs {
        if (dimension < 1) throw Error('Dimension error! Matrix dimension must be positive.');
        return new Matrixs(dimension, dimension).setAsIdentity();
    }
    multiply(mat: Matrixs): Matrixs {
        if (this.cols !== mat.rows) throw new Error("Dimension error! The operand matrix must have the same number of rows as 'this' matrix columns!");
        const resMatrix = new Matrixs(this.rows, mat.cols);
        resMatrix.data.map((row, i) => {
            return row.map((_, j) => {
                return this.values[i].reduce((sum, elm, k) => sum + (elm * mat.at(k, j)), 0);
            });
        });
        return resMatrix;
    }
    determinant(): number {
        if (this.rows !== this.cols) throw new Error("Dimension error! The matrix isn't squared!");
        if (this.rows === this.cols && this.cols === 1) { return this.values[0][0]; }

        let det = 0;
        let sign = 1;
        if (this.rows === 2) {
            det = this.values[0][0] * this.values[1][1] - this.values[1][0] * this.values[0][1];
        } else {
            for (let i = 0; i < this.rows; i++) {
                const minor = this.getCofactor(0, i);
                det += sign * this.at(0, i) * minor.determinant();
                sign = -sign;
            }
        }
        return det;
    }
    getCofactor(row: number, col: number): Matrixs {
        return new Matrixs(this.rows - 1, this.cols - 1, this.values
            .filter((_, i) => i !== row) // Remove the unnecessary row
            .map((c) => c.filter((_, i) => i !== col)));
    }
    transpose(): Matrixs {
        return new Matrixs(this.cols, this.rows, new Array<number[]>(this.cols).fill([])
            .map((_, i) => new Array<number>(this.rows).fill(0).map((_, j) => this.at(j, i))));
    }
    inverse() {
        if (this.rows !== this.cols) throw new Error("Dimension error! The matrix isn't squared!");
        const det = this.determinant();
        if (det === 0) throw new Error("Determinant is 0, can't compute inverse.");

        // Get cofactor matrix: i.e. for each matrix value, get the cofactor's determinant
        const cofactorMatrix = new Matrixs(this.rows, this.cols,
            this.values.map((row, i) => row.map((_, j) => {
                const sign = Math.pow(-1, i + j);
                return sign * this.getCofactor(i, j).determinant();
            })));
        // Transpose it
        const transposedCofactor = cofactorMatrix.transpose();
        // Compute inverse of transposed / determinant on each value
        return new Matrixs(this.rows, this.cols,
            this.values.map((row, i) => row.map((_, j) => transposedCofactor.at(i, j) / det)));
    }
}

export interface IMatrix {
    rows: number
    cols: number
    data: number[][]
}

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

    return elements
}

const mat2x3 = [0, 0, 0, 0, 0, 0]
const mats2x3 = [[0, 0, 0], [0, 0, 0]]