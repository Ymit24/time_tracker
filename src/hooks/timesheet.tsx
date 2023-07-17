import { SheetId } from "@models/timesheet";
import { useStore } from "@state/store";

export function useTimeSheetById(id: SheetId) {
    const timesheet = useStore(
        (state) => state.timesheets.find(sheet => sheet.id === id)
    );

    return timesheet;
}
