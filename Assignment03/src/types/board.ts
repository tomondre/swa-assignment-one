export type Generator<T> = { next: () => T };

export type Position = {
  row: number;
  col: number;
};

export type Match<T> = {
  matched: T;
  positions: Position[];
};

export type Board<T> = {
  width: number;
  height: number;
  grid: T[][];
};

export type Effect<T> = {
  kind: string;
  match?: {
    matched: T;
    positions: Position[];
  };
};

export type MoveResult<T> = {
  board: Board<T>;
  effects: Effect<T>[];
};

export class CyclicGenerator implements Generator<string> {
  private sequence: string;
  private index: number;

  constructor(sequence: string) {
    this.sequence = sequence;
    this.index = 0;
  }

  next(): string {
    const n = this.sequence.charAt(this.index);
    this.index = (this.index + 1) % this.sequence.length;
    return n;
  }
}
