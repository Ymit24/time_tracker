'use client'
import Link from "@components/Link";
import { Stack, Typography } from "@mui/material";

export default function RootHome() {
    return (
        <Stack>
            <Typography variant='h2' color='secondary'>Welcome to Time Tracker!</Typography>
            <Link href='/timesheets'>Goto timesheets!</Link>
        </Stack>
    );
}
