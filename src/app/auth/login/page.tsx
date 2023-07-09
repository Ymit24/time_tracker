"use client"
import { AuthService } from "@services/AuthService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import LoginForm from "@components/LoginForm";
import { Stack } from "@mui/material";

function handleLoginClick(auth: AuthService, username: string, password: string): void {
    console.log('logging in: ', username, password);
    auth.login(username, password);
}

function handleRegisterClick(router: AppRouterInstance): void {
    router.push('/auth/register');
}

export default function Login() {
    return (
        <Stack sx={{ gap: "1rem" }}>
            <LoginForm />
        </Stack>
    );
}
