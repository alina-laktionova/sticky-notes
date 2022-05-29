import {Note} from "../models/Note";
import {LOAD_NOTES} from "./actionTypes";

export function loadNotesFromStorage(notes: Note[]) {
    return {
        type: LOAD_NOTES,
        payload: {
            notes: notes
        }
    }
}