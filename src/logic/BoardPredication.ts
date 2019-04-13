import {PieceType} from '../models/enums/Type';
import {IBoard} from '../models/interfaces/IBoard';
import {Move} from '../models/Move';
import {TreeNode} from '../models/TreeNode';
import {TypePiecePosition} from '../models/types/PiecePosition';
import {TestType} from '../models/types/TestType';
import {boardTest} from './BoardLogic';

function buildTreeForPieceTypeHelper(board: IBoard, selfType: PieceType, otherType: PieceType, depth: number, testResults: Map<IBoard, TestType>): TreeNode[] {
  const testResult = boardTest(board);

  testResults.set(board, testResult);

  if (testResult.flag) {
    return [];
  } else {
    return board
      .availablePositions()
      .map((position: TypePiecePosition) => {
        const move = new Move(position, selfType);
        const updatedBoard = board.updatePiece(position.i, position.j, selfType);
        const children = buildTreeForPieceTypeHelper(updatedBoard, otherType, selfType, depth + 1, testResults);

        return new TreeNode(updatedBoard, move, children, testResults.get(updatedBoard));
      });
  }
}

export function buildTreeForPieceType(board: IBoard, selfType: PieceType, otherType: PieceType): TreeNode[] {
  return buildTreeForPieceTypeHelper(board, selfType, otherType, 0, new Map<IBoard, TestType>());
}