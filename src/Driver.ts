import {Board} from "./models/Board";

// @ts-ignore
async function main() {
    console.log('Started ...');

    const board = new Board(3);
    console.log(board.toString());
}

// noinspection JSIgnoredPromiseFromCall
main();

