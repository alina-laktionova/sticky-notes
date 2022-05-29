import {Note, noteInitState} from "../models/Note";
import {
    Action,
    ADD_NOTE,
    EDIT_TEXT,
    EDIT_TITLE,
    DELETE_NOTE,
    DRAG_NOTE,
    GET_NOTES,
    RESIZE_NOTE
} from "./actionTypes";
import {v4 as uuid} from 'uuid';
import {Position} from "../models/Position";
import {Size} from "../models/Size";

const init: Note[] = []

export default function notesReducer(state: Note[] = init, action: Action) {
    const {type, payload} = action

    switch (type) {
        case GET_NOTES:
            return payload.notes;
        case ADD_NOTE:
            return [...state, {...noteInitState, id: uuid()}];
        case DELETE_NOTE:
            return state.filter((note: Note) => note.id !== payload.id);
        case DRAG_NOTE:
            return dragNote(state, payload.id, payload.position)
        case RESIZE_NOTE:
            return resizeNote(state, payload.id, payload.size)
        case EDIT_TITLE:
            return editTitle(state, payload.id, payload.title)
        case EDIT_TEXT:
            return editText(state, payload.id, payload.text)
        default:
            return state
    }
}

function dragNote(notes: Note[], id: string, newPosition: Position): Note[] {
    return notes.map((note: Note) => {
        if(note.id === id) return {...note, position: newPosition}
        return note
    })
}

function resizeNote(notes: Note[], id: string, newSize: Size): Note[] {
    return notes.map((note: Note) => {
        if(note.id === id) return {...note, size: newSize}
        return note
    })
}

function editTitle(notes: Note[], id: string, newTitle: string): Note[] {
    return notes.map((note: Note) => {
        if(note.id === id) return {...note, title: newTitle}
        return note
    })
}

function editText(notes: Note[], id: string, newText: string): Note[] {
    return notes.map((note: Note) => {
        if(note.id === id) return {...note, text: newText}
        return note
    })
}