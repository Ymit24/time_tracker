'use client';

import { EntryId } from "@models/time_entry";
import { SheetId } from "@models/timesheet";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTimeSheetById } from "hooks/timesheet";
import { getDurationStrForDates } from "utils";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export interface Props {
    sheetId: string;
}

export default function TimeSheetEntriesTable({ sheetId }: Props) {
    const timesheet = useTimeSheetById(sheetId);
    if (!timesheet) {
        return <Typography color='error'>Failed to find timesheet with id: {sheetId}</Typography>;
    }

    const handleStopEntry = (id: EntryId) => { };
    const handleDeleteEntry = (id: EntryId) => { };
    const handleNewEntry = (id: EntryId) => { }; // NOTE: might take whole entry

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">Stop</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        <TableCell align="center">Controls</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timesheet.entries.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.start?.toLocaleString()}</TableCell>
                            <TableCell align="right">{row.isStopped ? row.stop?.toLocaleString() : "In Progress"}</TableCell>
                            <TableCell align="right">{getDurationStrForDates(row.start, row.stop)}</TableCell>
                            <TableCell align="right">
                                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                    {!row.isStopped ?
                                        <Button onClick={() => handleStopEntry(row.id)} color='secondary'><StopCircleOutlinedIcon /></Button>
                                        : <Button onClick={() => handleNewEntry(row.id)}><AddCircleOutlineOutlinedIcon /></Button>
                                    }
                                    <Button color='error' onClick={() => handleDeleteEntry(row.id)}><DeleteForeverOutlinedIcon /></Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
