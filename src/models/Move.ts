import {EnumValues} from 'enum-values';
import {PieceType} from './enums/Type';
import {TypePiecePosition} from "./types/PiecePosition";

export class Move {
  public source: TypePiecePosition;
  public pieceType: PieceType;

  constructor(source: TypePiecePosition, pieceType: PieceType) {
    this.source = source;
    this.pieceType = pieceType;
  }

  public toString(): string {
    return `Attempt to set (${this.source.i}, ${this.source.j}) to ${EnumValues.getNameFromValue(PieceType, this.pieceType)}`;
  }
}