import {PieceType} from '../models/enums/Type';
import {IBoard} from '../models/interfaces/IBoard';
import {Move} from '../models/Move';
import {TypePiecePosition} from '../models/types/PiecePosition';
import {boardTest} from "./BoardLogic";

class TreeNode {
  private move: Move;
  private children: TreeNode[];

  constructor(move: Move, children: TreeNode[]) {
    this.move = move;
    this.children = children;
  }

  public toString() {
    return `${this.move.toString()}
      children: 
      ${this.children.map((x: TreeNode) => x.toString()).join('\n')}`;
  }
}

function buildTreeForPieceType(board: IBoard, selfType: PieceType, otherType: PieceType, depth: number): TreeNode[] {
  const testResult = boardTest(board);

  if (testResult.flag) {
    return [];
  } else {
    return board
      .availablePositions()
      .map((position: TypePiecePosition) => {
        const move = new Move(position, selfType);
        const children = buildTreeForPieceType(board, otherType, selfType, depth + 1);

        return new TreeNode(move, children);
      });
  }
}