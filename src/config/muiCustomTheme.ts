import {createTheme, Paper, PaperProps, styled} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#5e5e5e',
            dark: '#000'
        },
    },
})

export const StyledPaper = styled(Paper)<PaperProps>(({theme}) => ({
    position: 'absolute',
    resize: 'both',
    overflow: 'auto',
    minWidth: '100px',
    minHeight: '100px',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fafad2',
    padding: '8px',
    [theme.breakpoints.down('lg')]: {
        '&::-webkit-resizer': {
            border: '3px double',
            borderColor: 'transparent black black transparent',
        }
    },
}))