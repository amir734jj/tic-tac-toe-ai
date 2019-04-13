import {IBoard} from '../interfaces/IBoard';
import {Move} from '../Move';
import {TestType} from "../types/TestType";
import {SimpleNode} from "./SimpleNode";

export class TreeNode extends SimpleNode {
  public children: TreeNode[];

  constructor(board: IBoard, move: Move, testResult: TestType, children: TreeNode[]) {
    super(board, move, testResult);
    this.children = children;
  }

  private static emptyString(depth: number) {
    let result = '';
    for (let i = 0; i < depth; i += 1) {
      result += '  ';
    }

    return result;
  }

  public toString(depthArg?: number): string {
    let depth = depthArg;

    if (depth === undefined) {
      depth = 0;
    }

    const printChildrenFunc = () => {
      if (this.children.length) {
        return `\n
${TreeNode.emptyString(depth)} children (depth: ${depth}):
${this.children.map((x: TreeNode) => `${TreeNode.emptyString(depth + 1)}${x.toString(depth + 1)}`).join('\n')}`;
      } else {
        return '';
      }

    };

    return `${super.toString()}${printChildrenFunc()}`;
  }
}