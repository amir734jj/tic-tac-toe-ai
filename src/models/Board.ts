import { Type } from './enums/Type';
import { clone } from '../utilities/Clone';
import { List } from 'immutable';
import { EnumValues } from 'enum-values';

type TypeMatrix = Type[][];

export class Board {
    public readonly Dimension: number = 3;
    private _matrix: TypeMatrix;
    private _history: List<TypeMatrix>;

    constructor() {
        // Initialize the board
        this._matrix = [];
        for(let i = 0; i < this.Dimension; i++) {
            this._matrix[i] = [];

            for(let j = 0; j < this.Dimension; j++) {
                this._matrix[i][j] = Type.None;
            }
        }

        this._history = List();
    }

    /**
     * Updates the board given indices
     * @param i
     * @param j
     * @param type
     */
    update(i: number, j: number, type: Type) {
        if (!this.validate(i, j)) {
            throw new Error("Invalid index")
        }

        this._history = this._history.push(this._matrix);

        // Deep clone self
        this._matrix = clone<TypeMatrix>(this._matrix);
        this._matrix[i][j] = type;
    }

    /**
     * Get board at index
     * @param i
     * @param j
     */
    get(i: number, j: number) {
        if (!this.validate(i, j)) {
            throw new Error("Invalid index")
        }

        return this._matrix[i][j];
    }

    /**
     * Validates indices
     * @param index
     */
    private validate(...index: number[]) {
        return index.reduce((x, y) => x && y >=0 && y < this.Dimension, true);
    }

    /**
     * toString override
     */
    toString() {
        return this._matrix.map(x => x.map(y => EnumValues.getNameFromValue(Type, y)).join(", ")).join("\n");
    }
}
