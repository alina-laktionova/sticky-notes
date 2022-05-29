import {configureStore} from '@reduxjs/toolkit'
import notesReducer, {NotesState} from "./notesReducer";


export const store = configureStore({
    reducer: {
        notes: notesReducer
    }
})

export type State = { notes: NotesState }
export type AppDispatch = typeof store.dispatch