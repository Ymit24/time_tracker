import { useEffect, useState } from "react";
import { useServices } from "../providers/ServicesProvider";
import { BehaviorSubject } from "rxjs";
import { on } from "events";
import { callLogin } from "../api/auth";

export interface AuthService {
    isLoggedIn$: BehaviorSubject<boolean>;

    activeUser$: BehaviorSubject<{
        username: string,
        email: string
    } | undefined>;

    login(username: string, password: string): Promise<boolean>;
    logout(): Promise<boolean>;
}

export interface User { username: string; email: string; }

export class BackendAuthService implements AuthService {
    isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        console.log("Creating auth service");
    }
    activeUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    async login(email: string, password: string): Promise<boolean> {
        console.log('username::', email);

        const _ = await callLogin(email, password);

        this.activeUser$.next({
            username: email,
            email: email,
        });
        this.isLoggedIn$.next(true);
        return true;
    }

    async logout(): Promise<boolean> {
        this.activeUser$.next(undefined);
        this.isLoggedIn$.next(false);
        return true;
    }
}

export function useActiveUser() {
    const { auth } = useServices();

    const [observable] = useState(auth!.activeUser$)
    const [activeUser, setActiveUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        console.log('subscribing to active user');
        const sub = observable.subscribe((user) => {
            console.log('updating user: ', user);
            setActiveUser(user);
        });
        return () => {
            console.log('unsubscribing from active user');
            sub.unsubscribe();
        }
    }, [observable]);

    return [activeUser];
}

export function useIsLoggedIn() {
    const { auth } = useServices();

    const [observable] = useState(auth!.isLoggedIn$)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log('subscribing to login');
        const sub = observable.subscribe((status) => {
            console.log('updating login: ', status);
            setIsLoggedIn(status);
        });
        return () => {
            console.log('unsubscribing from login');
            sub.unsubscribe();
        }
    }, [observable]);

    return isLoggedIn;
}
