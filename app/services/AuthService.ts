import { useEffect, useState } from "react";
import { useServices } from "../providers/ServicesProvider";
import { BehaviorSubject } from "rxjs";

export interface AuthService {
    isLoggedIn$: BehaviorSubject<boolean>;

    activeUser$: BehaviorSubject<{
        username: string,
        email: string
    } | undefined>;

    login(): Promise<boolean>;
    logout(): Promise<boolean>;
}

export interface User { username: string; email: string; }

export class BackendAuthService implements AuthService {
    isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        console.log("Creating auth service");
    }
    activeUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    async login(): Promise<boolean> {
        this.activeUser$.next({
            username: "bob",
            email: "bob@gmail.com",
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
        observable.subscribe((user) => {
            console.log('updating user: ', user);
            setActiveUser(user);
        });
        return observable.unsubscribe;
    }, [observable]);

    return [activeUser];
}

export function useIsLoggedIn() {
    const { auth } = useServices();

    const [observable] = useState(auth!.isLoggedIn$)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        observable.subscribe({
            next: (status) => {
                setIsLoggedIn(status);
            }
        });
        return observable.unsubscribe;
    }, [observable]);

    return [isLoggedIn];
}
