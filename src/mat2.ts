export interface Mat2 {
    rows: number,
    cols: number
    data: number[][]
}

let _data: number[][]
export const create = (rows: number, cols: number, data = [[0, 0], [0, 0]]): number[][] => {
    if (data) {
        return _data = data

    }

    return _data = new Array<number[]>(rows).fill([]).map(() => new Array<number>(cols).fill(0))
}