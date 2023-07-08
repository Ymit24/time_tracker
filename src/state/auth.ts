import { BehaviorSubject } from "rxjs";
import { User } from '@models/user';

export const isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
export const activeUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
