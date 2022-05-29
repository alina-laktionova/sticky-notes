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
    const notesState = useSelector((state: State) => state.notes)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const notesJSON: string | null = localStorage.getItem(STORAGE_KEY)
        if (notesJSON) {
            const notesObj: State = JSON.parse(notesJSON)
            dispatch(getNotesAction(notesObj))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notesState))
    }, [notesState])


    return <Box width={'100%'} height={'100vh'} overflow={"hidden"}>
        <Button
            onClick={() => dispatch(addNoteAction())}
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
            {notesState.notes.map((note: Note) =>
                <DraggableNote key={note.id} note={note}/>
            )}
    </Box>
}

export default App;
