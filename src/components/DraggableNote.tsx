import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import useResizeObserver from '@react-hook/resize-observer'
import {Box, IconButton, Input, Paper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import './noteStyles.css'
import {Size} from "../models/Size";
import {Note} from "../models/Note";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {
    deleteNoteAction,
    dragNoteAction,
    editTextAction,
    editTitleAction,
    resizeNoteAction,
    showOverNotesAction
} from "../store/actions";


type Props = {
    note: Note
}

export default function DraggableNote(props: Props) {

    const dispatch = useDispatch<AppDispatch>()
    const {note} = props

    const [noteTitle, setNoteTitle] = useState<string>(note.title)
    const [editTitleMode, setEditTitleMode] = useState<boolean>(false)

    const nodeRef = useRef(null);
    const size: Size = useSize(nodeRef)

    function useSize(target: any): Size {
        const [size, setSize] = useState<Size>(note.size)

        useResizeObserver(target, (entry: ResizeObserverEntry) => {
            setSize({
                width: Math.round(entry.contentRect.width),
                height: Math.round(entry.contentRect.height)
            })
        })
        return size
    }

    useEffect(() => {
        dispatch(resizeNoteAction(note.id, size))
    }, [size])

    function showOverOtherNotes() {
        dispatch(showOverNotesAction(note.id))
    }

    function handlerOnStopDrag(e: DraggableEvent, data: DraggableData) {
        dispatch(dragNoteAction(note.id, {x: data.x, y: data.y}))
    }

    function deleteNote() {
        dispatch(deleteNoteAction(note.id))
    }

    function editTitle() {
        if (note.title !== noteTitle)
            dispatch(editTitleAction(note.id, noteTitle))
        setEditTitleMode(false)
    }

    function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setNoteTitle(event.target.value)
    }

    function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
        dispatch(editTextAction(note.id, event.target.value))
    }

    return <Draggable nodeRef={nodeRef}
                      onStart={showOverOtherNotes}
                      onStop={handlerOnStopDrag}
                      defaultPosition={note.position}
                      bounds="parent"
                      handle=".handle">
        <Paper ref={nodeRef} elevation={5}
               onClick={showOverOtherNotes}
               sx={{
                   position: 'absolute',
                   resize: 'both',
                   overflow: 'auto',
                   width: note.size.width,
                   height: note.size.height,
                   minWidth: '100px',
                   minHeight: '100px',
                   display: 'flex',
                   flexDirection: 'column',
                   backgroundColor: '#fafad2',
                   padding: '8px',
                   zIndex: note.zIndex,
               }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%',
                cursor: 'move',
            }}>
                {editTitleMode
                    ? <IconButton size={"small"}
                                  onClick={editTitle}>
                        <DoneIcon fontSize={"small"}/>
                    </IconButton>
                    : <IconButton size={"small"}
                                  onClick={() => setEditTitleMode(true)}>
                        <EditOutlinedIcon fontSize={"small"}/>
                    </IconButton>
                }
                {editTitleMode
                    ? <Input defaultValue={note.title}
                             onChange={handleChangeTitle}
                             sx={{input: {textAlign: "center", padding: '0px'}}}/>
                    : <Typography className={'handle'}
                                  width={'100%'}
                                  textAlign={'center'}
                                  justifyContent={'center'}
                                  overflow={'hidden'}>
                        {note.title}
                    </Typography>
                }
                <IconButton size={"small"}
                            onClick={deleteNote}>
                    <CloseIcon fontSize={"small"}/>
                </IconButton>
            </Box>

            <Box height={'100%'} width={'100%'}>
                <textarea className={'sticker-text'}
                          defaultValue={note.text}
                          onChange={handleChangeText}/>
            </Box>
        </Paper>
    </Draggable>
}