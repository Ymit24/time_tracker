import { User } from "@models/user";
import { activeUser$, isLoggedIn$ } from "@state/auth";
import { useEffect, useState } from "react";

export function useActiveUser() {
    const [observable] = useState(activeUser$)
    const [activeUser, setActiveUser] = useState<User | null>(null);

    useEffect(() => {
        const sub = observable.subscribe((user) => {
            setActiveUser(user);
        });
        return () => {
            sub.unsubscribe();
        }
    }, [observable]);

    return [activeUser];
}

export function useIsLoggedIn() {
    const [observable] = useState(isLoggedIn$)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const sub = observable.subscribe((status) => {
            setIsLoggedIn(status);
        });
        return () => {
            sub.unsubscribe();
        }
    }, [observable]);

    return isLoggedIn;
}
