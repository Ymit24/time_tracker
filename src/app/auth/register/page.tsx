"use client"
import { Stack } from "@mui/material";
import RegisterForm from "@components/RegisterForm";



export default function Register() {
    return (
        <Stack sx={{ gap: "1rem" }}>
            <RegisterForm />
        </Stack>
    )
}
