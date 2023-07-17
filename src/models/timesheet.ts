import { TimeEntry } from "./time_entry";

export type SheetId = string;

export interface TimeSheet {
    id: SheetId;
    title: string;
    entries: TimeEntry[];
}
