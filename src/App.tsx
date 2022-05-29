import React, {useEffect} from 'react';
import {Box, Button, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, State} from "./store/store";
import {STORAGE_KEY} from "./config/constants";
import {Note} from "./models/Note";
import {addNoteAction, getNotesAction} from "./store/actions";
import DraggableNote from "./components/DraggableNote";

function App() {

    const notes = useSelector((state: State) => state.notes)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const notesJSON: string | null = localStorage.getItem(STORAGE_KEY)
        if (notesJSON) {
            const notesArr: Note[] = JSON.parse(notesJSON)
            dispatch(getNotesAction(notesArr))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    }, [notes])


    function addNewNote() {
        dispatch(addNoteAction())
    }


    return <Box width={'fit-content'} overflow={"auto"}>
        <Button
            onClick={addNewNote}
            variant={"outlined"}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    height: '50px',
                    width: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}>
            <AddIcon/>
            <Typography>Add Note</Typography>
        </Button>

        {notes.map((note: Note) =>
            <DraggableNote key={note.id} note={note}/>
        )}
    </Box>
}

export default App;
