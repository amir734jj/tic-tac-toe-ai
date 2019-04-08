import {Board} from "./models/Board";

// @ts-ignore
async function main() {
    console.log('Started ...');

    let board = new Board();
    console.log(board.toString());
}

main();

