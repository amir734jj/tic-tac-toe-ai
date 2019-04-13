import {PieceType} from '../models/enums/Type';
import {IBoard} from '../models/interfaces/IBoard';
import {Move} from '../models/Move';
import {TreeNode} from "../models/TreeNode";
import {TypePiecePosition} from '../models/types/PiecePosition';
import {boardTest} from './BoardLogic';

export function buildTreeForPieceType(board: IBoard, selfType: PieceType, otherType: PieceType, depthArg?: number): TreeNode[] {
  let depth = depthArg;

  if (depth === undefined) {
    depth = 0;
  }

  const testResult = boardTest(board);

  if (testResult.flag) {
    return [];
  } else {
    return board
      .availablePositions()
      .map((position: TypePiecePosition) => {
        const move = new Move(position, selfType);
        const updatedBoard = board.updatePiece(position.i, position.j, selfType);
        const children = buildTreeForPieceType(updatedBoard, otherType, selfType, depth + 1);

        return new TreeNode(move, children);
      });
  }
}