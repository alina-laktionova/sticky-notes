import {useState} from 'react'
import {ColorResult, GithubPicker} from 'react-color'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import {Box, IconButton} from '@mui/material'

type Props = {
    currColor: string
    setCurrColor: (color: string) => void
}

export default function ColorPicker(props: Props) {
    const {currColor, setCurrColor} = props
    const [showPicker, setShowPicker] = useState<boolean>(false)

    return (
        <>
            <IconButton size={'small'} onClick={() => setShowPicker(!showPicker)}>
                <ColorLensIcon fontSize={'small'} />
            </IconButton>
            {showPicker && (
                <Box position="absolute" top="40px" left="10px">
                    <GithubPicker
                        width={'100px'}
                        colors={[
                            '#EB9694',
                            '#FAD0C3',
                            '#FEF3BD',
                            '#C1E1C5',
                            '#BEDADC',
                            '#C4DEF6',
                            '#BED3F3',
                            '#D4C4FB',
                        ]}
                        color={currColor}
                        onChangeComplete={(color: ColorResult) => setCurrColor(color.hex)}
                    />
                </Box>
            )}
        </>
    )
}
