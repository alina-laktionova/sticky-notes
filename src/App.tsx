import React from 'react';
import './App.css';
import DraggableSticker from "./components/DraggableSticker";
import {IconButton} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function App() {


    return <>
        <IconButton>
            <AddCircleOutlineIcon/>
        </IconButton>
        <DraggableSticker/>
    </>
}

export default App;
