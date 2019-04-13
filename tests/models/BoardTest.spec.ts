import {Board} from '../../src/models/Board';
import {PieceType} from '../../src/models/enums/Type';
import {IBoard} from "../../src/models/interfaces/IBoard";

describe('board model', () => {

  let board: IBoard;

  beforeAll(() => {
    board = new Board(2);
  });

  it('get piece to return none', () => {
    expect(board.getPiece(0, 0)).toBe(PieceType.None);
  });

  it('update to be circle', () => {
    board.updatePiece(0, 0, PieceType.Circle);
    expect(board.getPiece(0, 0)).toBe(PieceType.Circle);
  });

  it('get row at index', () => {
    board
      .updatePiece(0, 0, PieceType.Circle)
      .updatePiece(0, 1, PieceType.Circle)
      .updatePiece(1, 0, PieceType.Square)
      .updatePiece(1, 1, PieceType.Square);

    expect(board.row(0)).toEqual([ PieceType.Circle, PieceType.Circle ]);
    expect(board.row(1)).toEqual([ PieceType.Square, PieceType.Square ]);
  });

  it('get column at index', () => {
    board
      .updatePiece(0, 0, PieceType.Circle)
      .updatePiece(0, 1, PieceType.Square)
      .updatePiece(1, 0, PieceType.Circle)
      .updatePiece(1, 1, PieceType.Square);

    expect(board.column(0)).toEqual([ PieceType.Circle, PieceType.Circle ]);
    expect(board.column(1)).toEqual([ PieceType.Square, PieceType.Square ]);
  });
});