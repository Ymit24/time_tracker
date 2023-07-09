import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "@models/user";
import { activeUser$, isLoggedIn$ } from "@state/auth";

export interface AuthService {
    login(username: string, password: string): Promise<boolean>;
    register(email: string, username: string, password: string): Promise<boolean>;
    logout(): Promise<void>;
}


export class BackendAuthService implements AuthService {
    constructor() {
        this.init();
    }

    async init() {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                activeUser$.next(user);
                isLoggedIn$.next(true);
            } catch {
                console.error('Failed to decode user from localStorage. Expected user, found: ', userString);
            }
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const res = await axios.post('http://127.0.0.1:3000/api/auth/login', {
                email: email,
                password: password
            });

            const token: string = res.data.token;
            const user: User = res.data.user;

            if (!token || !user) {
                console.warn('failed to register!');
                return false;
            }

            localStorage.setItem('user', JSON.stringify(user));

            const cookies = new Cookies();
            cookies.set('token', token, { path: '/' });

            isLoggedIn$.next(true);
            activeUser$.next(user);

        } catch (err) {
            console.error('err::', err);
            return false;
        }

        return true;
    }

    async register(email: string, username: string, password: string): Promise<boolean> {
        try {
            const res = await axios.post('http://127.0.0.1:3000/api/auth/register', {
                email: email,
                username: username,
                password_raw: password
            });
            localStorage.setItem('user', JSON.stringify({
                username,
                email,
                id: -1
            }));
            // TODO: LOGIN AFTER SUCCESSFUL REGISTER
            isLoggedIn$.next(true);
            activeUser$.next({
                username,
                email,
                id: -1
            });
            return true;
        } catch (err) {
        }
        return false;
    }

    async logout(): Promise<void> {
        activeUser$.next(null);
        isLoggedIn$.next(false);
        localStorage.removeItem('user');
        const cookies = new Cookies();
        cookies.remove('token');
        return;
    }
}
