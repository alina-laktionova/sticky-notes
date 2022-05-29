import {Note} from "../models/Note";
import {Action, LOAD_NOTES} from "./actionTypes";

const init: Note[] = []

export default function notesReducer(state: Note[] = init, action: Action) {
    const {type, payload} = action

    switch (type) {
        case LOAD_NOTES:
            return payload.notes
        default:
            return state
    }
}