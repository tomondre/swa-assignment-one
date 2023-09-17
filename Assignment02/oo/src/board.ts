export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type BoardEvent<T> = ?;

export type BoardListener<T> = ?;

export class Board<T> {
    addListener(listener: BoardListener<T>) {
    }

    piece(p: Position): T | undefined {
    }

    canMove(first: Position, second: Position): boolean {
    }
    
    move(first: Position, second: Position) {
    }
}
