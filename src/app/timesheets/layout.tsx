'use client'
import Link from "@components/Link";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react"
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';


export interface Props {
    children: ReactNode;
}

export default function TimeSheetLayout({ children }: Props) {
    return <>{children}</>;
}
