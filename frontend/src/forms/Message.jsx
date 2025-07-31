import React from "react";
import {Box, Typography} from '@mui/material'

function Message({messageText, messageColor}) {
    return(
        <Box sx={{
            width: '100%',
            height: '30px',
            color: 'white',
            marginBottom: '20px',
            padding: '10px',
            display: 'flex',
            backgroundColor: messageColor,
            alignItems: 'center',
        }}
    >
            <Typography>{messageText}</Typography>
        </Box>
    );
}

export default Message