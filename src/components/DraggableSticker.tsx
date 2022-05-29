import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import React, {useLayoutEffect, useRef, useState} from "react";
import useResizeObserver from '@react-hook/resize-observer'
import {Box, Paper, Typography} from "@mui/material";
import './styles.css'


export default function DraggableSticker() {

    type Position = { x: number, y: number }
    type Size = { width: number, height: number }

    const [currPosition, setCurrPosition] = useState<Position>({x: 300, y: 150})
    const nodeRef = useRef(null);
    const size: Size = useSize(nodeRef)

    function useSize(target: any): Size {
        const [size, setSize] = useState<Size>({width: 100, height: 100})

        useLayoutEffect(() => {
            setSize({
                width: Math.round(target.current.getBoundingClientRect().width),
                height: Math.round(target.current.getBoundingClientRect().height)
            })
        }, [target])

        useResizeObserver(target, (entry: ResizeObserverEntry) => {
                setSize({
                    width: Math.round(entry.contentRect.width),
                    height: Math.round(entry.contentRect.height)
                })
                console.log(size)
            }
        )
        return size
    }


    function handlerOnStopDrag(e: DraggableEvent, data: DraggableData) {
        console.log('final position X: ' + data.x + ' Y: ' + data.y);
        setCurrPosition({x: data.x, y: data.y})
    }


    return <>
        <Draggable nodeRef={nodeRef}
                   onStop={handlerOnStopDrag}
                   defaultPosition={currPosition}
                   handle=".handle">
            <Paper ref={nodeRef} elevation={5}
                 sx={{
                     resize: "both",
                     overflow: 'auto',
                     width: '200px',
                     height: '200px',
                     minWidth: '100px',
                     minHeight: '100px',
                     display: 'flex',
                     flexDirection: "column",
                     backgroundColor: '#fafad2',
                     padding: '8px'
                 }}>
                <Box className={"handle"}
                     sx={{
                         textAlign: 'center',
                         width: '100%',
                         cursor: "move",
                     }}>
                    <Typography>Size width: {size.width} height: {size.height}</Typography>
                    <Typography>Position x: {currPosition.x} y: {currPosition.y}</Typography>
                </Box>
                <Box height={'100%'} width={'100%'}>
                    <textarea className={'sticker-text'} />
                </Box>

            </Paper>
        </Draggable>

    </>
}