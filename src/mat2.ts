export interface Mat2 {
    rows: number,
    cols: number
    data: number[][]
}

export const create = (rows: number, cols: number, data = [[0, 0], [0, 0]]): number[][] => {
    let _data: number[][] = []
    if (data) {
        return _data = data
    }
    return _data = new Array<number[]>(rows).fill([]).map(() => new Array<number>(cols).fill(0))
}

export const creates = () => {
    // let a = new Float32Array(4)
    // let b = new Float32Array(2)
    let _data = new Float32Array(4)
    // for (let row = 0; row < 2; row++) {
    // _data.set(a.subarray(0, 2))
    // for (let col = 0; col < 2; col++) {
    // _data[row][col] = 0
    // _data.set(b, 5)
    // _data.set(a.subarray(2), 2);
    // _data
    // }
    // }
    return _data
}

export const getRows = (a: number[][]) => {
    return a
}
export const getCols = (a: number[][]) => {
    return a[0]
}