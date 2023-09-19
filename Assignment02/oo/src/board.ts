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
    private listeners: EventListener[];
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
        this.listeners.push(listener);
    }

    piece(p: Position): T | undefined {
        if (this.isPositionOutsideOfGrid(p))
            return undefined;
        return this.grid[p.row][p.col];
    }

    canMove(first: Position, second: Position): boolean {
        if (this.isPositionOutsideOfGrid(first) || this.isPositionOutsideOfGrid(second))
            return false
        if (!(this.areSameRow(first, second) || this.areSameColumn(first, second)))
            return false
        return this.isMatch(first, second);
    }

    private isPositionOutsideOfGrid(p: Position) {
        return (p.col < 0 || p.col >= this.width) || (p.row < 0 || p.row >= this.height);
    }

    private isMatch(first: Position, second: Position): boolean {
        const switchedGrid = this.copyGrid();
        const firstPiece = switchedGrid[first.row][first.col];
        const secondPiece = switchedGrid[second.row][second.col];

        switchedGrid[first.row][first.col] = secondPiece;
        switchedGrid[second.row][second.col] = firstPiece;

        // In row
        for (let h = 0; h < this.height; h++) {
            let rowMatchesCount = 0;
            for (let w = 0; w < this.width - 1; w++) {
                if (switchedGrid[h][w] === switchedGrid[h][w + 1]) {
                    rowMatchesCount++;
                    if (rowMatchesCount === 2)
                        return true;
                } else {
                    // Makes sure that the only one type of value is matched
                    // e.g. does not matches (1, 1, 2, 2), but matches only (1, 1, 1, 2)
                    rowMatchesCount = 0;
                }
            }
        }

        // In column
        for (let w = 0; w < this.width; w++) {
            let columnMatchesCount = 0;
            for (let h = 0; h < this.height - 1; h++) {
                if (switchedGrid[h][w] === switchedGrid[h + 1][w]) {
                    columnMatchesCount++;
                    if (columnMatchesCount === 2)
                        return true;
                } else {
                    columnMatchesCount = 0;
                }
            }
        }
        return false;
    }

    private copyGrid() {
        const newGrid = [];
        for (let h = 0; h < this.height; h++) {
            let row: T[] = [];
            for (let w = 0; w < this.width; w++) {
                row.push(this.grid[h][w]);
            }
            newGrid.push(row);
        }
        return newGrid;
    }

    private areSameRow(first: Position, second: Position) {
        return first.row === second.row;
    }

    private areSameColumn(first: Position, second: Position) {
        return first.col === second.col;
    }

    move(first: Position, second: Position) {

        // Trigger events
    }
}
