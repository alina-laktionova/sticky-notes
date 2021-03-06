import {createTheme, Paper, PaperProps, styled} from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#5e5e5e',
            dark: '#000',
        },
    },
})

export const StyledPaper = styled(Paper)<PaperProps>(() => ({
    position: 'absolute',
    resize: 'both',
    overflow: 'auto',
    minWidth: '200px',
    minHeight: '150px',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
}))
