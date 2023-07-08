"use client"
import { useServices } from "@providers/ServicesProvider";
import { AuthService, useIsLoggedIn } from "@services/AuthService";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

function handleLoginClick(auth: AuthService, username: string, password: string): void {
    console.log('logging in: ', username, password);
    auth.login(username, password);
}

function handleRegisterClick(router: AppRouterInstance): void {
    router.push('/auth/register');
}

export default function Login() {
    const { auth } = useServices();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <Stack sx={{ gap: "1rem" }}>
            <Card sx={{ padding: "1rem", alignSelf: "center" }}>
                <Typography variant="h6">Login</Typography>
                <Stack sx={{ gap: "1rem" }}>
                    <TextField
                        label="Username"
                        type="text"
                        placeholder="your-cool-username"
                        variant="outlined"
                        value={username}
                        onChange={
                            (e) => { setUsername(e.target.value); }
                        }
                    />
                    <TextField
                        label="Password"
                        type="password"
                        placeholder="1234"
                        variant="outlined"
                        value={password}
                        onChange={
                            (e) => { setPassword(e.target.value); }
                        }
                    />
                    <Button variant="contained" color="primary" onClick={() => handleLoginClick(auth, username, password)}>Login</Button>
                    <Typography>Dont have an account? <Button variant="outlined" onClick={() => handleRegisterClick(router)}>Register</Button></Typography>
                </Stack>
            </Card>
        </Stack>
    );
}
