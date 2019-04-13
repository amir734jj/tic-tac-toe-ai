import {Board} from "./models/Board";
import {PieceType} from "./models/enums/Type";
import {buildTreeForPieceType} from "./logic/BoardPredication";
import {IBoard} from "./models/interfaces/IBoard";
import {TreeNode} from "./models/TreeNode";

// @ts-ignore
async function main() {
  console.log('Started ...');

  let board: IBoard = new Board(3);
  console.log(board.toString());

  board = board
    .updatePiece(0, 0, PieceType.Circle)
    .updatePiece(0, 1, PieceType.None)
    .updatePiece(1, 0, PieceType.Circle)
    .updatePiece(1, 1, PieceType.None);


  const tree = buildTreeForPieceType(board, PieceType.Circle, PieceType.Square);

  console.log(tree.map((x: TreeNode) => x.toString()).join('\n'));
}

// noinspection JSIgnoredPromiseFromCall
main();

