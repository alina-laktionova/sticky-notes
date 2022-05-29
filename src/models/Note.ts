import {Size} from "./Size";
import {Position} from "./Position";

export interface Note {
    id: string,
    title: string,
    text: string,
    size: Size,
    position: Position,
    zIndex: number,
}

export const noteInitState = {
    id: '',
    title: 'Sticky Note',
    text: '',
    size: {width: '200px', height: '200px'},
    position: {x: 100, y: 100},
    zIndex: 1
}