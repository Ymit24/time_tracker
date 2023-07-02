import { ReactNode, createContext, useContext } from "react";
import { AuthService } from "../services";

const servicesContext = createContext<Services>({});

export interface Services {
    auth?: AuthService
}

export interface Props {
    children: ReactNode,
    services: Services
}

export function useServices() {
    return useContext(servicesContext);
}

export function ServicesProvider({ children, services }: Props) {
    return (
        <servicesContext.Provider value={services}>
            {children}
        </servicesContext.Provider>
    );
}
