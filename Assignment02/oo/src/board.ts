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
    private generator: Generator<T>;
    public width: number;
    public height: number;
    public grid: T[][];
    constructor(generator: Generator<T>, width: number, height: number) {
        this.generator = generator;
        this.height = height;
        this.width = width;
        this.grid = [];
        this.generateGrid();
    }

    private generateGrid() {
        for (let h = 0; h < this.height; h++) {
            let row: T[] = [];
            for (let w = 0; w < this.width; w++) {
                row.push(this.generator.next());
            }
            this.grid.push(row);
        }
    }

    addListener(listener: BoardListener<T>) {
    }

    piece(p: Position): T | undefined {
        const row = this.grid[p.row]
        if (!row)
            return undefined;
        return row[p.col];
    }

    canMove(first: Position, second: Position): boolean {
    }
    
    move(first: Position, second: Position) {
    }
}
