import {Note} from "../models/Note";
import {ADD_NOTE, EDIT_TEXT, EDIT_TITLE, DELETE_NOTE, DRAG_NOTE, GET_NOTES, RESIZE_NOTE} from "./actionTypes";
import {Position} from "../models/Position";
import {Size} from "../models/Size";

export function getNotesAction(notes: Note[]) {
    return {
        type: GET_NOTES,
        payload: {
            notes: notes
        }
    }
}

export function addNoteAction() {
    return {
        type: ADD_NOTE
    }
}

export function deleteNoteAction(id :string) {
    return {
        type: DELETE_NOTE,
        payload: {
            id: id
        }
    }
}

export function dragNoteAction(id: string, position: Position) {
    return {
        type: DRAG_NOTE,
        payload: {
            id: id,
            position: position
        }
    }
}

export function resizeNoteAction(id: string, size: Size) {
    return {
        type: RESIZE_NOTE,
        payload: {
            id: id,
            size: size
        }
    }
}

export function editTitleAction(id: string, title: string) {
    return {
        type: EDIT_TITLE,
        payload: {
            id: id,
            title: title
        }
    }
}

export function editTextAction(id: string, text: string) {
    return {
        type: EDIT_TEXT,
        payload: {
            id: id,
            text: text
        }
    }
}