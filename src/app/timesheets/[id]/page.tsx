'use client';
import { Stack, Typography } from "@mui/material";

export interface Props {
    params: { id: string };
}
export default function TimesheetsPage({ params }: Props) {
    return (<Stack>
        <Typography variant='h3'>Time sheet -- {params.id}</Typography>
    </Stack>);
}
