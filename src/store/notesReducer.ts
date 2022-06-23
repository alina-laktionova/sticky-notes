import {Note, noteInitState} from '../models/Note'
import {
    Action,
    ADD_NOTE,
    EDIT_TEXT,
    EDIT_TITLE,
    DELETE_NOTE,
    DRAG_NOTE,
    GET_NOTES,
    RESIZE_NOTE,
    SHOW_OVER_NOTES,
    CHANGE_COLOR,
} from './actionTypes'
import {v4 as uuid} from 'uuid'
import {Position} from '../models/Position'
import {Size} from '../models/Size'

export type NotesState = {
    notes: Note[]
    maxZIndex: number
}
const init = {
    notes: [],
    maxZIndex: 1,
}

export default function notesReducer(state: NotesState = init, action: Action) {
    const {type, payload} = action

    switch (type) {
        case GET_NOTES:
            return payload.notesState
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, {...noteInitState, id: uuid(), zIndex: state.maxZIndex}],
                maxZIndex: state.maxZIndex + 1,
            }
        case DELETE_NOTE:
            return {...state, notes: deleteNote(state.notes, payload.id)}
        case DRAG_NOTE:
            return {...state, notes: dragNote(state.notes, payload.id, payload.position)}
        case RESIZE_NOTE:
            return {...state, notes: resizeNote(state.notes, payload.id, payload.size)}
        case EDIT_TITLE:
            return {...state, notes: editTitle(state.notes, payload.id, payload.title)}
        case EDIT_TEXT:
            return {...state, notes: editText(state.notes, payload.id, payload.text)}
        case CHANGE_COLOR:
            return {...state, notes: changeColor(state.notes, payload.id, payload.color)}
        case SHOW_OVER_NOTES:
            return {
                ...state,
                notes: showOverNotes(state.notes, payload.id, state.maxZIndex + 1),
                maxZIndex: state.maxZIndex + 1,
            }
        default:
            return state
    }
}

function deleteNote(notes: Note[], id: string): Note[] {
    return notes.filter((note: Note) => note.id !== id)
}

function dragNote(notes: Note[], id: string, newPosition: Position): Note[] {
    return notes.map((note: Note) => {
        if (note.id === id) return {...note, position: newPosition}
        return note
    })
}

function resizeNote(notes: Note[], id: string, newSize: Size): Note[] {
    return notes.map((note: Note) => {
        if (note.id === id) return {...note, size: newSize}
        return note
    })
}

function editTitle(notes: Note[], id: string, newTitle: string): Note[] {
    return notes.map((note: Note) => {
        if (note.id === id) return {...note, title: newTitle}
        return note
    })
}

function editText(notes: Note[], id: string, newText: string): Note[] {
    return notes.map((note: Note) => {
        if (note.id === id) return {...note, text: newText}
        return note
    })
}

function changeColor(notes: Note[], id: string, newColor: string): Note[] {
    return notes.map((note: Note) => {
        if (note.id === id) return {...note, bgColor: newColor}
        return note
    })
}

function showOverNotes(notes: Note[], id: string, zIndex: number): Note[] {
    return notes.map((note: Note) => {
        if (note.id === id) return {...note, zIndex: zIndex}
        return note
    })
}
