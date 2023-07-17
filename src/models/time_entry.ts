export type EntryId = number;

export interface TimeEntry {
    id: EntryId;
    name: string;
    start: Date;
    stop?: Date;
    isStopped: boolean;
}
