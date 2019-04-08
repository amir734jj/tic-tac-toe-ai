import { Board } from '../models/Board';

export class BoardLogic {

  static isComplete(board: Board) {

    for(let i = 0; i < board.Dimension; i++) {
      for(let j = 0; j < board.Dimension; j++) {
        board.get(i, j)
      }
    }
  }
}
