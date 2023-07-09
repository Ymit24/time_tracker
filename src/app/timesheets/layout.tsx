'use client'
import Link from "@components/Link";
import { Box, Button, Container, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Props {
    children: ReactNode;
}

export default function TimeSheetLayout({ children }: Props) {
    return (
        <Grid container gap={2}>
            <Grid xs={2}>
                <Paper>
                    <Stack gap={2} sx={{ alignItems: 'start', padding: '1.5rem' }}>
                        <Typography variant='h6'>Timesheets</Typography>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((it, index) => <Link key={index} href={`/timesheets`}>Timesheet {index}</Link>)}
                        <IconButton sx={{ alignSelf: 'center' }}><AddIcon color='success' /></IconButton>
                    </Stack>
                </Paper>
            </Grid>
            <Grid xs={8}>
                {children}
            </Grid>
        </Grid>
    );
}
