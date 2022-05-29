import { configureStore } from '@reduxjs/toolkit'
import notesReducer from "./notesReducer";
import {Note} from "../models/Note";

export type State = {
    notes: Note[]
}

export const store = configureStore({
    reducer: {
        notes: notesReducer
    }
})

export type AppDispatch = typeof store.dispatch
// export const useTypedDispatch = () => useDispatch<AppDispatch>()