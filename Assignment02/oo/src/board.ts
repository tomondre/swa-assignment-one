export type Generator<T>= { next:() => T }

export type Position = {
    row: number,
    col: number
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type BoardEvent<T> = {
    kind: 'Match' | 'Refill',
    match?: Match<T>
};

export type BoardListener<T> = (event: BoardEvent<T>) => any;

export class Board<T> {
    private generator: Generator<T>;
    public width: number;
    public height: number;
    public grid: T[][];
    private listeners: BoardListener<T>[];

    constructor(generator: Generator<T>, width: number, height: number) {
        this.generator = generator;
        this.height = height;
        this.width = width;
        this.grid = [];
        this.listeners = [];
        this.generateGrid();
    }

    positions(): Position[] {
        const positions: Position[] = [];
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                positions.push({row: r, col: c})
            }
        }
        return positions;
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
        return this.switchAndGetMatches(first, second).length > 0;
    }

    private isPositionOutsideOfGrid(p: Position) {
        return (p.col < 0 || p.col >= this.width) || (p.row < 0 || p.row >= this.height);
    }

    private switchAndGetMatches(first: Position, second: Position): Match<T>[] {
        const gridCopy = this.copyGrid(this.grid);

        this.switchGridPositions(gridCopy, first, second);

        return this.getMatches(gridCopy);
    }

    private switchGridPositions(grid: T[][], first: Position, second: Position) {
        const firstPiece = grid[first.row][first.col];
        const secondPiece = grid[second.row][second.col];
        grid[first.row][first.col] = secondPiece;
        grid[second.row][second.col] = firstPiece;
    }

    private getMatches(grid: T[][]): Match<T>[] {
        const matches = [];

        // In row
        for (let h = 0; h < this.height; h++) {
            let positions: Position[] = [];
            for (let w = 0; w < this.width - 1; w++) {
                if (grid[h][w] === grid[h][w + 1]) {
                    // First iteration
                    if (positions.length === 0)
                        positions.push({row: h, col: w})
                    positions.push({row: h, col: w + 1})
                    if (positions.length === 3) {
                        matches.push({
                            matched: this.piece(positions[0]),
                            positions: positions,
                        });
                        positions = [];
                    }
                } else {
                    positions = [];
                }
            }
        }

        // In column
        for (let w = 0; w < this.width; w++) {
            let positions: Position[] = [];
            for (let h = 0; h < this.height - 1; h++) {
                if (grid[h][w] === grid[h + 1][w]) {
                    // First Iteration
                    if (positions.length === 0)
                        positions.push({row: h, col: w});
                    positions.push({row: h + 1, col: w});
                    if (positions.length === 3) {
                        matches.push({
                            matched: this.piece(positions[0]),
                            positions
                        });
                        positions = [];
                    }
                } else {
                    positions = [];
                }
            }
        }
        return matches;
    }

    private copyGrid(grid: T[][]) {
        const newGrid = [];
        for (let h = 0; h < grid.length; h++) {
            let row: T[] = [];
            for (let w = 0; w < grid[0].length; w++) {
                row.push(grid[h][w]);
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

    /* Steps
    1. Find Matches
    2. Remove all matches
    3. Drop all the fields from top to bottom
    4. Refill all the positions from left to right, from bottom to top
     */
    move(first: Position, second: Position) {
        if (!this.canMove(first, second))
            return;

        this.switchGridPositions(this.grid, first, second);

        this.checkAndHandleMatch();
    }

    private checkAndHandleMatch() {
        const matches = this.getMatches(this.grid);
        if (matches.length === 0)
            return;

        for (let match of matches) {
            this.fireEvent({
                kind: "Match",
                match
            });
            this.removePositions(match.positions);
        }

        this.refreshPositions();
        this.fireEvent({
            kind: "Refill"
        });
        this.checkAndHandleMatch();
    }

    private removePositions(positions: Position[]) {
        for (let position of positions) {
            this.grid[position.row][position.col] = null
        }
    }

    private takeNumberAbove(position: Position): T| null {
        for (let r = position.row - 1; r >= 0; r--) {
            const value = this.grid[r][position.col];
            if (value) {
                this.grid[r][position.col] = null;
                return value;
            }
        }
        return null;
    }

    private refreshPositions() {
        // Make all existing items drop
        for (let h = this.height - 1; h >= 0; h--) {
            for (let w = 0; w < this.width; w++) {
                if (!this.piece({row: h, col: w}))
                    this.grid[h][w] = this.takeNumberAbove({row: h, col: w});
            }
        }

        // Fill by row and column all null values, starting from the bottom
        for (let h = this.height - 1; h >= 0; h--) {
            for (let w = 0; w < this.width; w++) {
                const piece = this.piece({row: h, col: w});
                if (!piece)
                    this.grid[h][w] = this.generator.next();
            }
        }
    }

    private fireEvent(event: BoardEvent<T>) {
        for (let listener of this.listeners) {
            listener(event);
        }
    }
}
