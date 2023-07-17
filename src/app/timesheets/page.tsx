'use client';
import { TimeSheetsTable } from "@components/TimeSheetsTable";
import { Button, Container, Table, TableContainer, Typography } from "@mui/material";
import { useStore } from "@state/store";
import { MouseEvent } from "react";

export default function TimesheetsPage() {
    const addTimeSheet = useStore((store) => store.addTimeSheet);

    const handleCreateTimeSheet = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        addTimeSheet('some timesheet');

        console.log('create time sheet!');
    };

    return (
        <Container>
            <Typography variant='h4' color='secondary'>Click or create a timesheet to get started!</Typography>
            <Button onClick={(e) => handleCreateTimeSheet(e)}>Create new timesheet!</Button>

            <TimeSheetsTable />

        </Container>
    );
}
