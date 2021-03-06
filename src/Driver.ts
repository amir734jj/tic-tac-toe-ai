import {buildDecisionTreeForPieceType, shortedWinPath} from './logic/BoardPredication';
import {Board} from './models/Board';
import {PieceType} from './models/enums/Type';
import {IBoard} from './models/interfaces/IBoard';
import {TreeNode} from './models/nodes/TreeNode';

// @ts-ignore
async function main() {
  console.log('Started ...');

  let board: IBoard = new Board(3);
  console.log(board.toString());

  board = board
    .updatePiece(0, 0, PieceType.None)
    .updatePiece(0, 1, PieceType.None)
    .updatePiece(1, 0, PieceType.Circle)
    .updatePiece(1, 1, PieceType.None);


  const trees = buildDecisionTreeForPieceType(board, PieceType.Square, PieceType.Circle);
  const shortedWinPathResult = shortedWinPath(trees);

  const result = shortedWinPathResult.map((x: TreeNode) => x.toString()).join('\n');

  console.log(result);
}

// noinspection JSIgnoredPromiseFromCall
main();

