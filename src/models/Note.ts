import {Size} from "./Size";
import {Position} from "./Position";

export interface Note {
    title: string,
    text: string,
    size: Size,
    position: Position
}