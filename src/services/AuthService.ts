import { useEffect, useState } from "react";
import { useServices } from "../providers/ServicesProvider";
import { BehaviorSubject } from "rxjs";
import axios from "axios";
import Cookies from "universal-cookie";

export interface AuthService {
    isLoggedIn$: BehaviorSubject<boolean>;

    activeUser$: BehaviorSubject<User | undefined>;

    login(username: string, password: string): Promise<void>;
    register(email: string, username: string, password: string): Promise<boolean>;
    logout(): Promise<void>;
}

export interface User { username: string; id: number, email: string; }

export class BackendAuthService implements AuthService {
    isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        console.log("Creating auth service");
        this.init();
    }
    activeUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    async init(): Promise<void> {
        const user = localStorage.getItem('user');
        if (user) {
            this.activeUser$.next(JSON.parse(user));
            this.isLoggedIn$.next(true);
        }
    }

    async login(username: string, password: string): Promise<void> {
        console.log('username::', username);
        this.activeUser$.next({
            username: username,
            email: username + '@gmail.com',
            id: 1
        });
        this.isLoggedIn$.next(true);

        try {
            const res = await axios.post('http://127.0.0.1:3000/api/auth/login', {
                email: username,
                password: password
            });

            const token: string = res.data.token;
            const user: User = res.data.user;
            console.log("User::", user);

            localStorage.setItem('user', JSON.stringify(user));

            const cookies = new Cookies();
            cookies.set('token', token, { path: '/' });

            console.log('Cookies::', cookies.get('token'));

            console.log('res::', res);
        } catch (err) {
            console.error('err::', err);
        }

        return;
    }

    async register(email: string, username: string, password: string): Promise<boolean> {
        console.log('registering');
        try {
            const res = await axios.post('http://127.0.0.1:3000/api/auth/register', {
                email: email,
                username: username,
                password_raw: password
            });
            console.log('res::', res);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            return true;
        } catch (err) {
            console.error('err::', err);
        }
        return false;
    }

    async logout(): Promise<void> {
        this.activeUser$.next(undefined);
        this.isLoggedIn$.next(false);
        localStorage.removeItem('user');
        const cookies = new Cookies();
        cookies.remove('token');
        return;
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
