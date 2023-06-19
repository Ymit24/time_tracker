'use client'
import { Backdrop, Box, Button, Stack, CircularProgress, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react';

function SimpleBackdrop() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Show backdrop</Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

function createData(
    id: number,
    name: string,
    start: Date,
    stop?: Date
) {
    return { id, name, start, stop, isStopped: false };
}

function getDurationStrFor(duration: number): string {
    const seconds = duration / 1000;
    const minutes = seconds / 60;
    const hours = Math.floor(minutes / 60);
    let durationStr = "";
    const minutesVal = Math.floor(minutes % 60);
    const secondsVal = Math.floor(seconds % 60);

    if (hours > 0) { durationStr += `${hours} hrs ` }
    if (minutesVal > 0) { durationStr += `${minutesVal} mins ` }
    if (secondsVal >= 0) { durationStr += `${secondsVal} secs` }

    return durationStr;
}

function getDurationStrForDates(start: Date, stop?: Date): string {
    const duration = (stop || new Date()).valueOf() - start.valueOf();
    return getDurationStrFor(duration);
}

type TimeEntry = {
    id: number,
    name: string,
    start: Date,
    stop?: Date,
    isStopped: boolean,
};

type TimeSheet = {
    entries: TimeEntry[]
};

const seedRows = [
    createData(0, "Ticket #3", new Date(2023, 5, 18, 7), new Date(2023, 5, 18, 8)),
    createData(1, "Meeting", new Date(2023, 5, 18, 8), new Date(2023, 5, 18, 8, 30)),
    createData(2, "Ticket #1", new Date(2023, 5, 18, 8, 30), new Date(2023, 5, 18, 9)),
    createData(3, "Ticket #7", new Date(2023, 5, 18, 9)),
];

function BasicTable({ timeSheet, stopEntryFunc, newEntryFrom }: { timeSheet: TimeSheet, stopEntryFunc: (id: number) => void, newEntryFrom: (entry: TimeEntry) => void }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">Stop</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        <TableCell align="right">Controls</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeSheet.entries.map((row) => (
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
                            <TableCell align="right">{!row.isStopped ?
                                <Button onClick={() => stopEntryFunc(row.id)}>Stop</Button>
                                : <Button onClick={() => newEntryFrom(row)}>New</Button>
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function getDurationOf(entry: TimeEntry): number {
    return (entry.stop || new Date()).valueOf() - entry.start.valueOf();
}

function CondensedTable({ timeSheet }: { timeSheet: TimeSheet }) {
    const rows: { name: string, durationStr: string, durationRaw: number, entries: number }[] = [];

    timeSheet.entries.forEach((entry) => {
        const index = rows.findIndex((row) => row.name == entry.name);
        if (index == -1) {
            rows.push({
                name: entry.name,
                durationStr: getDurationStrForDates(entry.start, entry.stop),
                durationRaw: getDurationOf(entry),
                entries: 1
            });
        } else {
            rows[index].durationRaw += getDurationOf(entry);
            rows[index].durationStr = getDurationStrFor(rows[index].durationRaw);
            rows[index].entries++;
        }
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Name</TableCell>
                        <TableCell align='right'>Duration</TableCell>
                        <TableCell align='right'>Entries</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align='left'>{row.name}</TableCell>
                            <TableCell align='right'>{row.durationStr}</TableCell>
                            <TableCell align='right'>{row.entries.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {
    let originalExistingTimesheet = JSON.parse(localStorage.getItem('timesheet') || '{entries: []}') as TimeSheet;
    const existingTimesheet = {
        entries: originalExistingTimesheet.entries.map((entry) => ({
            ...entry,
            start: new Date(entry.start),
            stop: new Date(entry.stop || 0),
        }))
    };
    const [timesheet, setTimesheet] = useState<TimeSheet>(existingTimesheet);

    const [newEntryTitle, setNewEntryTitle] = useState("");
    const onChangeNewEntryTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewEntryTitle(e.target.value);
    };

    const createNewEntry = () => {
        setTimesheet({
            entries: [
                ...timesheet.entries,
                createData(timesheet.entries.length, newEntryTitle, new Date())
            ]
        });
        setNewEntryTitle("");
    };

    const stopEntry = (entryId: number) => {
        const entry = timesheet.entries.find(x => x.id == entryId);
        if (!entry) return;
        setTimesheet({
            entries: [
                ...timesheet.entries.filter(x => x.id != entryId),
                {
                    ...createData(entryId, entry.name, entry.start, new Date()), isStopped: true
                }
            ]
        });
    };

    const newEntryFrom = (entry: TimeEntry) => {
        setTimesheet({
            entries: [
                ...timesheet.entries,
                createData(timesheet.entries.length, entry.name, new Date())
            ]
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimesheet({
                entries: timesheet.entries.map((entry) => {
                    if (entry.isStopped) { return entry; }
                    else return { ...entry, stop: new Date() };
                })
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [timesheet.entries]);

    useEffect(() => {
        const toSave = {
            entries: timesheet.entries.map((entry) => ({
                ...entry,
                start: entry.start.valueOf(),
                stop: entry.stop?.valueOf(),
            }))
        };
        localStorage.setItem('timesheet', JSON.stringify(toSave));
    }, [timesheet]);

    const showOutput = () => { };

    type activeViews = 'entries' | 'condensed';
    const [activeView, setActiveView] = useState<activeViews>('entries');

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth='md' sx={{ marginY: '20px' }}>
                <Stack spacing='1rem'>
                    <Typography variant='h3'>Time Tracker</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction='row' spacing='12px'>
                            <TextField value={newEntryTitle} onChange={onChangeNewEntryTitle} label='Name' variant='outlined' />
                            <Button variant="outlined" onClick={createNewEntry}>new</Button>
                        </Stack>
                        {activeView == 'entries' && <Button variant="outlined" color='secondary' onClick={() => setActiveView('condensed')}>show condensed</Button>}
                        {activeView == 'condensed' && <Button variant="outlined" color='secondary' onClick={() => setActiveView('entries')}>show entries</Button>}
                    </Box>
                    <Typography variant='h4'>{activeView == 'entries' ? "Entries" : "Condensed"}</Typography>
                    {activeView == 'entries' && <BasicTable timeSheet={timesheet} stopEntryFunc={stopEntry} newEntryFrom={newEntryFrom} />}
                    {activeView == 'condensed' && <CondensedTable timeSheet={timesheet} />}
                </Stack>
            </Container>
        </ThemeProvider >
    )
}
