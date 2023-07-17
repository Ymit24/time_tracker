import { TimeSheet } from "@models/timesheet";
import { StateCreator } from 'zustand';
import { StoreState } from "./store";

export interface TimeSheetSlice {
    timesheets: TimeSheet[];
    addTimeSheet: (title: string) => void;
    addEntry: (sheetId: string, name: string) => void;
}

export const createTimeSheetSlice: StateCreator<
    StoreState,
    [],
    [],
    TimeSheetSlice
> = (set) => ({
    timesheets: [],
    addTimeSheet: (title: string): void => {
        set((state) => ({
            timesheets: [...state.timesheets, {
                id: 'no_id',
                title,
                entries: []
            }]
        }));
    },
    addEntry: (sheetId: string, name: string): void => {
        set((state) => {
            const sheet = state.timesheets.find(sheet => sheet.id === sheetId);
            console.log('adding entry to sheet', sheet);
            if (!sheet) {
                throw new Error('Cant add entry to non-existent sheet!');
            }
            return {
                timesheets: [
                    ...state.timesheets.filter(sheet => sheet.id !== sheetId),
                    {
                        ...sheet,
                        entries: [
                            ...sheet.entries,
                            {
                                id: -1,
                                name,
                                start: new Date(),
                                isStopped: false,
                            }
                        ]
                    }
                ]
            };
        });
    },
});
