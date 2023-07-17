import { BehaviorSubject } from "rxjs";
import { User } from '@models/user';
import { StoreState } from "./store";
import { StateCreator } from "zustand";

export const isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
export const activeUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

export interface AuthSlice {
    isLoggedIn: boolean;
    activeUser?: User;
}

export const createAuthSlice: StateCreator<
    StoreState,
    [],
    [],
    AuthSlice
> = (set) => ({
    isLoggedIn: false,
    activeUser: undefined,
});
