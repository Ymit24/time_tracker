"use client"
import { ReactNode, createContext, useContext } from "react";
import { AuthService, BackendAuthService } from "@services/AuthService";

const servicesContext = createContext<Services | undefined>(undefined);

export interface Services {
    auth: AuthService
}

export interface Props {
    children: ReactNode,
}

export function useServices() {
    const services = useContext(servicesContext);
    if (!services) {
        throw new Error('useServices called outside of provider!');
    }
    return services;
}

export function ServicesProvider({ children }: Props) {
    console.log('service provider render');
    const services = {
        auth: new BackendAuthService(),
    };
    return (
        <servicesContext.Provider value={services}>
            {children}
        </servicesContext.Provider>
    );
}
