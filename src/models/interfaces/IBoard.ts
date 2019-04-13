import {PieceType} from '../enums/Type';
import {TypePiecePosition} from "../types/PiecePosition";

export interface IBoard {
  DIMENSION: number;

  updatePiece(i: number, j: number, pieceType: PieceType): IBoard;

  getPiece(i: number, j: number): PieceType;

  availablePositions(): TypePiecePosition[]

  row(i: number): PieceType[];

  column(j: number): PieceType[];
}