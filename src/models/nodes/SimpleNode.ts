import {EnumValues} from "enum-values";
import {PieceType} from "../enums/Type";
import {IBoard} from "../interfaces/IBoard";
import {Move} from '../Move';
import {TestType} from "../types/TestType";

export class SimpleNode {
  public board: IBoard;
  public testResult: TestType;
  public move: Move;

  constructor(board: IBoard, move: Move, testResult: TestType) {
    this.board = board;
    this.move = move;
    this.testResult = testResult;
  }

  public toString(): string {
    return `${this.move.toString()} ${this.testResult.flag ? `; won: ${EnumValues.getNameFromValue(PieceType, this.testResult.pieceType)}` : ''}`;
  }
}