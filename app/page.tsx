'use client'
import { Backdrop, Box, Button, Stack, CircularProgress, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Icon, NoSsr } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

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

function BasicTable({
    timeSheet,
    stopEntryFunc,
    newEntryFrom,
    deleteEntryFunc
}: {
    timeSheet: TimeSheet,
    stopEntryFunc: (id: number) => void,
    newEntryFrom: (entry: TimeEntry) => void,
    deleteEntryFunc: (id: number) => void
}
) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                            <TableCell align="right">
                                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                    {!row.isStopped ?
                                        <Button onClick={() => stopEntryFunc(row.id)} color='secondary'><StopCircleOutlinedIcon /></Button>
                                        : <Button onClick={() => newEntryFrom(row)}><AddCircleOutlineOutlinedIcon /></Button>
                                    }
                                    <Button color='error' onClick={() => deleteEntryFunc(row.id)}><DeleteForeverOutlinedIcon /></Button>
                                </Box>
                            </TableCell>
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

function SummaryTable({ timeSheet }: { timeSheet: TimeSheet }) {
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
    useEffect(() => {
        let originalExistingTimesheet = JSON.parse(localStorage.getItem('timesheet') || '{entries: []}') as TimeSheet;
        const existingTimesheet = {
            entries: originalExistingTimesheet.entries.map((entry) => ({
                ...entry,
                start: new Date(entry.start),
                stop: new Date(entry.stop || 0),
            }))
        };
        setTimesheet(existingTimesheet);
    }, []);
    const [timesheet, setTimesheet] = useState<TimeSheet>({ entries: [] });
    const [titleIsError, setTitleIsError] = useState(false);

    const [newEntryTitle, setNewEntryTitle] = useState("");
    const onChangeNewEntryTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewEntryTitle(e.target.value);
        setTitleIsError(false);
    };

    const getNextId = () => {
        if (timesheet.entries.length == 0) return 0;
        const highestEntryId = timesheet.entries.reduce((acc, entry) => entry.id > acc.id ? entry : acc);
        return highestEntryId.id + 1;
    };

    const createNewEntry = () => {
        if (newEntryTitle.length == 0) {
            setTitleIsError(true);
            return;
        }
        setTitleIsError(false);
        setTimesheet({
            entries: [
                ...timesheet.entries,
                createData(getNextId(), newEntryTitle, new Date())
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
                createData(getNextId(), entry.name, new Date())
            ]
        });
    };

    const deleteEntry = (entryId: number) => {
        setTimesheet({
            entries: [
                ...timesheet.entries.filter((entry) => entry.id != entryId)
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

    type activeViews = 'entries' | 'summary';
    const [activeView, setActiveView] = useState<activeViews>('entries');
    const [showingClearDialog, setShowingClearDialog] = useState(false);

    return (
        <NoSsr>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container maxWidth='md' sx={{ marginY: '20px' }}>
                    <Stack spacing='1rem'>
                        <Typography variant='h3'>Time Tracker</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Stack direction='row' spacing='12px'>
                                <TextField error={titleIsError} value={newEntryTitle} onChange={onChangeNewEntryTitle} label='Name' variant='outlined' />
                                <Button variant="outlined" onClick={createNewEntry} color='success'>new</Button>
                            </Stack>
                            <Stack direction='row' spacing='12px'>
                                {activeView == 'entries' && <Button variant="outlined" color='secondary' onClick={() => setActiveView('summary')}>show summary</Button>}
                                {activeView == 'summary' && <Button variant="outlined" color='secondary' onClick={() => setActiveView('entries')}>show entries</Button>}
                                <Button variant='outlined' color='error' onClick={() => setShowingClearDialog(true)}>Clear</Button>
                                <Dialog
                                    open={showingClearDialog}
                                    onClose={() => setShowingClearDialog(false)}
                                >
                                    <DialogTitle>Clear this timesheet?</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={() => { setShowingClearDialog(false); setTimesheet({ entries: [] }); }} color='warning'>Clear</Button>
                                        <Button onClick={() => { setShowingClearDialog(false) }} autoFocus>Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                        </Box>
                        <Typography variant='h4'>{activeView == 'entries' ? "Entries" : "Summary"}</Typography>
                        {activeView == 'entries' && <BasicTable timeSheet={timesheet} stopEntryFunc={stopEntry} newEntryFrom={newEntryFrom} deleteEntryFunc={deleteEntry} />}
                        {activeView == 'summary' && <SummaryTable timeSheet={timesheet} />}
                    </Stack>
                </Container>
            </ThemeProvider >
        </NoSsr>
    )
}
