import {EnumValues} from 'enum-values';
import {List} from "immutable";
import * as lodash from 'lodash';
import {PieceType} from './enums/Type';
import {IBoard} from './interfaces/IBoard';
import {TypePiecePosition} from "./types/PiecePosition";

type TypeMatrix = PieceType[][];

export class Board implements IBoard {
  public readonly DIMENSION: number = 3;
  private matrix: TypeMatrix;

  constructor(dimension: number, matrix?: TypeMatrix) {
    this.DIMENSION = dimension;

    if (matrix) {
      this.matrix = matrix;
    } else {
      // Initialize the board
      this.matrix = [];
      for (let i = 0; i < this.DIMENSION; i += 1) {
        this.matrix[i] = [];

        for (let j = 0; j < this.DIMENSION; j += 1) {
          this.matrix[i][j] = PieceType.None;
        }
      }
    }
  }

  /**
   * Updates the board given indices
   * @param i
   * @param j
   * @param pieceType
   */
  public updatePiece(i: number, j: number, pieceType: PieceType): IBoard {
    if (!this.validate(i, j)) {
      throw new Error("Invalid index")
    }

    const updatedBoard = lodash.cloneDeep(this.matrix);
    updatedBoard[i][j] = pieceType;

    return new Board(this.DIMENSION, updatedBoard);
  }

  /**
   * Get board at index
   * @param i
   * @param j
   */
  public getPiece(i: number, j: number): PieceType {
    if (!this.validate(i, j)) {
      throw new Error("Invalid index")
    }

    return this.matrix[i][j];
  }

  /**
   * Returns the row given number
   * @param {number} i
   * @returns {PieceType[]}
   */
  public row(i: number): PieceType[] {
    return this.matrix[i];
  }

  /**
   * Returns the column given number
   * @param {number} j
   * @returns {PieceType[]}
   */
  public column(j: number): PieceType[] {
    return this.matrix.map((x: PieceType[]) => x[j]);
  }

  /**
   * Returns the available positions
   * @returns {{i: number; j: number}[]}
   */
  public availablePositions(): TypePiecePosition[] {
    let result: List<TypePiecePosition> = List<TypePiecePosition>();
    for (let i = 0; i < this.DIMENSION; i += 1) {
      for (let j = 0; j < this.DIMENSION; j += 1) {
        if (this.matrix[i][j] === PieceType.None) {
          result = result.push({ i, j });
        }
      }
    }

    return result.toArray();
  }

  /**
   * toString override
   */
  public toString(): string {
    return `[\n${this.matrix.map((x: PieceType[]) => `\t${x.map((y: PieceType) => EnumValues.getNameFromValue(PieceType, y)).join(", ")}`).join('\n')}\n]`;
  }

  /**
   * Validates indices
   * @param index
   */
  private validate(...index: number[]) {
    return index.reduce((x: boolean, y: number) => x && y >= 0 && y < this.DIMENSION, true);
  }
}
