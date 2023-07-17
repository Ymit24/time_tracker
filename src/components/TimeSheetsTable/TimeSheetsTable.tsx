'use client';

import Link from "@components/Link";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useStore } from "@state/store";

export default function TimeSheetsTable() {
    const timesheets = useStore((store) => store.timesheets);

    return (
        <TableContainer>
            <Table aria-label='Timesheets Table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell># Entries</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Controls</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timesheets.map((sheet) => (
                        <TableRow key={sheet.id}>
                            <TableCell><Link href={`/timesheets/${sheet.id}`}>{sheet.title}</Link></TableCell>
                            <TableCell>{sheet.entries.length}</TableCell>
                            <TableCell>{sheet.entries.filter(entry => !entry.stop).length > 0 ? 'Yes' : 'No'}</TableCell>
                            <TableCell><Button>open</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
