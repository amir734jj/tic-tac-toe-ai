import {Move} from "./Move";

export class TreeNode {
  private move: Move;
  private children: TreeNode[];

  constructor(move: Move, children: TreeNode[]) {
    this.move = move;
    this.children = children;
  }

  private static generateSpace(count: number) {
    let result = '';
    for (let i = 0; i < count; i+=1) {
      result += '      ';
    }

    return result;
  }

  public toString(depth?: number) {
    return `${this.move.toString()}
      children: 
      ${TreeNode.generateSpace(depth)}${this.children.map((x: TreeNode) => x.toString(depth + 1)).join('\n')}`;
  }
}