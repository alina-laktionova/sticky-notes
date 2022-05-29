export type Action = {
    type: string;
    payload?: any;
}


export const GET_NOTES = 'Load notes from storage'

export const ADD_NOTE = 'Add new sticky note'
export const DELETE_NOTE = 'Delete sticky note'

export const EDIT_TITLE = 'Edit title'
export const EDIT_TEXT = 'Edit text'

export const RESIZE_NOTE = 'Resize note'
export const DRAG_NOTE = 'Drag note'
