"use client"

import { useServices } from "@providers/ServicesProvider";
import { Box, Button, Card, Input, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Container } from "postcss";
import { useState } from "react";
import { setEmitFlags } from "typescript";
import { useActiveUser, useIsLoggedIn } from "hooks/auth";



export default function Register() {
    const { auth } = useServices();
    const [activeUser] = useActiveUser();
    const isLoggedIn = useIsLoggedIn();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleLoginClick = () => {
        router.push('/auth/login');
    };

    const handleRegisterClick = async () => {
        if (password !== passwordConfirmation) {
            return;
        }
        const didRegister = await auth.register(email, username, password);

        if (didRegister) {
            router.push('/');
        }
    };

    return (
        <Stack sx={{ gap: "1rem" }}>
            <Card sx={{ padding: "1rem", alignSelf: "center" }}>
                <Typography variant="h6">Register</Typography>
                <Stack sx={{ gap: "1rem" }}>
                    <TextField label="Email" type="email" placeholder="email@address.ext" variant="outlined" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></TextField>
                    <TextField label="Username" type="text" placeholder="your-cool-username" variant="outlined" value={username} onChange={(e) => setUsername(e.currentTarget.value)}></TextField>
                    <TextField label="Password" type="password" placeholder="1234" variant="outlined" value={password} onChange={(e) => setPassword(e.currentTarget.value)}></TextField>
                    <TextField label="Password Confirmation" type="password" placeholder="1234" variant="outlined" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}></TextField>
                    <Button variant="contained" color="success" onClick={() => handleRegisterClick()}>Register</Button>
                    <Typography>Already have an account? <Button variant="outlined" onClick={() => handleLoginClick()}>Login</Button></Typography>
                </Stack>
            </Card>
        </Stack>
    )
}
