export type Action = {
    type: string;
    payload?: any;
}


export const LOAD_NOTES = 'Load notes from storage'

export const ADD_NOTE = 'Add new sticky note'
export const DELETE_NOTE = 'Delete sticky note'

export const CHANGE_TITLE = 'Change title'
export const CHANGE_TEXT = 'Change text'

export const RESIZE_NOTE = 'Resize note'
export const DRAG_NOTE = 'Drag note'
