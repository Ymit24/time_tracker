import { Typography } from "@mui/material";
import { ReactNode } from "react";
import * as NavLink from "next/link";

export interface Props {
    href: string,
    children: ReactNode,
}

export const Link = (props: Props) => {
    return (
        <NavLink.default href={props.href}>
            <Typography color='primary' component='span'>{props.children}</Typography>
        </NavLink.default>
    );
};
