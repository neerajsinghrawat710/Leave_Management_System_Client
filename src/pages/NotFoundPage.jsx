import { Box, Button, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import '../css/pages/NotFoundPage.scss'


export default function NotFoundPage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
            <Stack spacing={2} justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
                <Typography color='primary' variant='h4'>What on earth are you doing here!</Typography>
                <Typography variant='subtitle2'>Well, this is awkward, the page you were trying to view does not exist.</Typography>
                <Link href="/"><Button variant='contained'>Back to home</Button></Link>
            </Stack>
        </Box>
    )
}
