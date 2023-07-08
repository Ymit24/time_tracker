import { User } from "@models/user";
import { activeUser$, isLoggedIn$ } from "@state/auth";
import { useEffect, useState } from "react";

export function useActiveUser() {
    const [observable] = useState(activeUser$)
    const [activeUser, setActiveUser] = useState<User | null>(null);

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
    const [observable] = useState(isLoggedIn$)
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
