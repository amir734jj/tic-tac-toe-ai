import {EnumValues} from "enum-values";
import {PieceType} from "./enums/Type";
import {IBoard} from "./interfaces/IBoard";
import {Move} from './Move';
import {TestType} from "./types/TestType";

export class TreeNode {
  public board: IBoard;
  private move: Move;
  private children: TreeNode[];
  private testResult: TestType;

  constructor(board: IBoard, move: Move, children: TreeNode[], testResult: TestType) {
    this.board = board;
    this.move = move;
    this.children = children;
    this.testResult = testResult;
  }

  private static emptyString(depth: number) {
    let result = '';
    for (let i = 0; i < depth; i += 1) {
      result += '  ';
    }

    return result;
  }

  public toString(depthArg?: number): string {
    let depth = depthArg;

    if (depth === undefined) {
      depth = 0;
    }

    return `${this.move.toString()} ${this.testResult.flag ? `; won: ${EnumValues.getNameFromValue(PieceType, this.testResult.pieceType)}` : ''}
${TreeNode.emptyString(depth)} children (depth: ${depth}):
${this.children.map((x: TreeNode) => `${TreeNode.emptyString(depth + 1)}${x.toString(depth + 1)}`).join('\n')}`;
  }
}