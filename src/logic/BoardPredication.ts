import * as lodash from 'lodash';
import {PieceType} from '../models/enums/Type';
import {IBoard} from '../models/interfaces/IBoard';
import {Move} from '../models/Move';
import {SimpleNode} from '../models/nodes/SimpleNode';
import {TreeNode} from '../models/nodes/TreeNode';
import {TypePiecePosition} from '../models/types/PiecePosition';
import {TestType} from '../models/types/TestType';
import {boardTest} from './BoardLogic';

function generateCacheKey(board: IBoard, selfType: PieceType, otherType: PieceType): string {
  return `${board.hashCode()}${selfType}${otherType}`;
}

function buildDecisionTreeForPieceTypeHelper(board: IBoard, selfType: PieceType, otherType: PieceType, depth: number, testResults: Map<IBoard, TestType>, cache: Map<string, TreeNode[]>): TreeNode[] {
  const testResult = boardTest(board);

  testResults.set(board, testResult);

  if (testResult.flag) {
    return [];
  } else {
    const cacheKey = generateCacheKey(board, selfType, otherType);

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    } else {
      const result = board
        .availablePositions()
        .map((position: TypePiecePosition) => {
          const move = new Move(position, selfType);
          const updatedBoard = board.updatePiece(position.i, position.j, selfType);
          const children = buildDecisionTreeForPieceTypeHelper(updatedBoard, otherType, selfType, depth + 1, testResults, cache);

          return new TreeNode(updatedBoard, move, testResults.get(updatedBoard), children);
        });

      cache.set(cacheKey, result);

      return result;
    }
  }
}

export function buildDecisionTreeForPieceType(board: IBoard, selfType: PieceType, otherType: PieceType): TreeNode[] {
  return buildDecisionTreeForPieceTypeHelper(board, selfType, otherType, 0, new Map<IBoard, TestType>(), new Map<string, TreeNode[]>());
}

function shortestWinPathHelper(previous: TreeNode[], treeNode: TreeNode): TreeNode[] {
  if (treeNode.testResult.flag) {
    return previous.concat([ treeNode ]);
  } else {
    const result = lodash.sortBy(treeNode.children.map((x: TreeNode) => shortestWinPathHelper(previous.concat([treeNode]), x)), (x: TreeNode[]) => x.length);
    if (result.length) {
      return result[result.length - 1];
    } else{
      return [];
    }
  }
}

export function shortedWinPath(paths: TreeNode[]): SimpleNode[] {
  const result = lodash.sortBy(paths.map((x: TreeNode) => shortestWinPathHelper([], x)), (x: TreeNode[]) => x.length);
  if (result.length) {
    return result[result.length - 1].map((x: TreeNode) => new SimpleNode(x.board, x.move, x.testResult));
  } else{
    return [];
  }
}