import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "@models/user";
import { activeUser$, isLoggedIn$ } from "@state/auth";

export interface AuthService {
    login(username: string, password: string): Promise<void>;
    register(email: string, username: string, password: string): Promise<boolean>;
    logout(): Promise<void>;
}


export class BackendAuthService implements AuthService {
    constructor() {
        console.log("Creating auth service");
        const user = localStorage.getItem('user');
        if (user) {
            activeUser$.next(JSON.parse(user));
            isLoggedIn$.next(true);
        }
    }

    async login(username: string, password: string): Promise<void> {
        console.log('username::', username);
        activeUser$.next({
            username: username,
            email: username + '@gmail.com',
            id: 1
        });
        isLoggedIn$.next(true);

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
            // TODO: LOGIN AFTER SUCCESSFUL REGISTER
            return true;
        } catch (err) {
            console.error('err::', err);
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
