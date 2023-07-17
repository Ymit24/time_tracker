import { create } from "zustand";
import { TimeSheetSlice, createTimeSheetSlice } from "./timesheets";
import { AuthSlice, createAuthSlice } from "./auth";

export type StoreState = TimeSheetSlice & AuthSlice;

export const useStore = create<StoreState>()((...a) => ({
    ...createTimeSheetSlice(...a),
    ...createAuthSlice(...a),
}));
