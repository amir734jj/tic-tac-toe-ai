import {columnTest, diagonalBackwardTest, diagonalForwardTest, rowTest} from '../src/logic/BoardLogic';
import {Board} from '../src/models/Board';
import {PieceType} from '../src/models/enums/Type';
import {IBoard} from '../src/models/interfaces/IBoard';

describe('board logic model', () => {

  let board: IBoard;

  beforeAll(() => {
    board = new Board(2);
  });

  it('row test', () => {
    board
      .updatePiece(0, 0, PieceType.Circle)
      .updatePiece(0, 1, PieceType.Circle)
      .updatePiece(1, 0, PieceType.None)
      .updatePiece(1, 1, PieceType.None);

    const result = rowTest(board);

    expect(result.flag).toBe(true);
    expect(result.pieceType).toBe(PieceType.Circle);
  });

  it('column test', () => {
    board
      .updatePiece(0, 0, PieceType.Circle)
      .updatePiece(0, 1, PieceType.None)
      .updatePiece(1, 0, PieceType.Circle)
      .updatePiece(1, 1, PieceType.None);

    const result = columnTest(board);

    expect(result.flag).toBe(true);
    expect(result.pieceType).toBe(PieceType.Circle);
  });

  it('backward diagonal test', () => {
    board
      .updatePiece(0, 0, PieceType.Circle)
      .updatePiece(0, 1, PieceType.None)
      .updatePiece(1, 0, PieceType.None)
      .updatePiece(1, 1, PieceType.Circle);

    const result = diagonalBackwardTest(board);

    expect(result.flag).toBe(true);
    expect(result.pieceType).toBe(PieceType.Circle);
  });

  it('forward diagonal test', () => {
    board
      .updatePiece(0, 0, PieceType.None)
      .updatePiece(0, 1, PieceType.Circle)
      .updatePiece(1, 0, PieceType.Circle)
      .updatePiece(1, 1, PieceType.None);

    const result = diagonalForwardTest(board);

    expect(result.flag).toBe(true);
    expect(result.pieceType).toBe(PieceType.Circle);
  });
});