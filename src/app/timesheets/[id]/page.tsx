'use client';
import Link from "@components/Link";
import { TimeSheetEntriesTable } from "@components/TimeSheetEntriesTable";
import { Button, Stack, Typography } from "@mui/material";
import { useStore } from "@state/store";
import { useTimeSheetById } from "hooks/timesheet";
import { MouseEvent } from 'react';

export interface Props {
    params: { id: string };
}
export default function TimesheetsPage({ params }: Props) {
    const sheetId = params.id;
    const timesheet = useTimeSheetById(sheetId);

    const addEntry = useStore((state) => state.addEntry);

    if (!timesheet) {
        // 404
        return (
            <Stack>
                <Typography variant='h3'>Timesheet not found!</Typography>
                <Link href='/timesheets'>Back to timesheets</Link>
            </Stack>
        );
    }

    const handleAddEntry = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addEntry(sheetId, 'asdf');
    };

    return (<Stack>
        <Link href='/timesheets'>Back</Link>
        <Typography variant='h3'>Time sheet -- {sheetId}</Typography>
        <Typography variant='h5'>Title: {timesheet.title}</Typography>
        <Typography variant='h5'># Entries: {timesheet.entries.length}</Typography>
        <Button onClick={(e) => handleAddEntry(e)}>Add Entry</Button>
        <TimeSheetEntriesTable sheetId={sheetId} />
    </Stack>);
}
