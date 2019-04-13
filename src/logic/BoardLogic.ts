import * as lodash from 'lodash';
import {PieceType} from '../models/enums/Type';
import {IBoard} from '../models/interfaces/IBoard';

type TestType = { flag: boolean; pieceType: PieceType };

/**
 * Forward diagonal test for win
 * @param {IBoard} board
 * @returns {TestType}
 */
export function diagonalForwardTest(board: IBoard): TestType {
  let flag = true;
  let pieceType: PieceType = PieceType.None;

  for (let i = 0; i < board.DIMENSION; i += 1) {
    for (let j = board.DIMENSION - 1; j >= 0; j -= 1) {
      if (i + j + 1 === board.DIMENSION) {
        if (i === 0) {
          pieceType = board.getPiece(i, j);
        } else {
          flag = flag && pieceType !== PieceType.None && board.getPiece(i, j) === pieceType;
        }
      }
    }
  }

  return {
    flag,
    pieceType
  };
}

/**
 * Backward diagonal test for win
 * @param {IBoard} board
 * @returns {TestType}
 */
export function diagonalBackwardTest(board: IBoard): TestType {
  let flag = true;
  let pieceType: PieceType = PieceType.None;

  for (let i = 0; i < board.DIMENSION; i += 1) {
    for (let j = 0; j < board.DIMENSION; j += 1) {
      if (i === j) {
        if (i === 0) {
          pieceType = board.getPiece(i, j);
        } else {
          flag = flag && pieceType !== PieceType.None && board.getPiece(i, j) === pieceType;
        }
      }
    }
  }

  return {
    flag,
    pieceType
  };
}

/**
 * Row test the board for win
 * @param {IBoard} board
 * @returns {TestType}
 */
export function rowTest(board: IBoard): TestType {

  for (let i = 0; i < board.DIMENSION; i += 1) {
    let flag = true;
    let pieceType: PieceType = PieceType.None;

    board.row(i).forEach((x: PieceType, index: number) => {
      if (index === 0) {
        pieceType = x;
      } else {
        flag = flag && x !== PieceType.None && pieceType === x;
      }
    });

    if (flag) {
      return {
        flag,
        pieceType
      };
    }
  }

  return {
    flag: false,
    pieceType: PieceType.None
  };
}

/**
 * Column test the board for win
 * @param {IBoard} board
 * @returns {TestType}
 */
export function columnTest(board: IBoard): TestType {

  for (let j = 0; j < board.DIMENSION; j += 1) {
    let flag = true;
    let pieceType: PieceType = PieceType.None;

    board.column(j).forEach((x: PieceType, index: number) => {
      if (index === 0) {
        pieceType = x;
      } else {
        flag = flag && x !== PieceType.None && pieceType === x;
      }
    });

    if (flag) {
      return {
        flag,
        pieceType
      };
    }
  }

  return {
    flag: false,
    pieceType: PieceType.None
  };
}

/**
 * Complete board test for win
 * @param {IBoard} board
 * @returns {TestType}
 */
export function boardTest(board: IBoard) : TestType {
  const testResults = [
    columnTest(board), rowTest(board), diagonalForwardTest(board), diagonalBackwardTest(board)
  ];

  const result = lodash.find(testResults, (x: TestType) => x.flag);

  if (result) {
    return result;
  } else {
    return {
      flag: false,
      pieceType: PieceType.None
    };
  }
}