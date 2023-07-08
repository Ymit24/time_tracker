"use client"

import { useServices } from "@providers/ServicesProvider";
import { useActiveUser, useIsLoggedIn } from "@services/AuthService";
import { Box, Button, Card, Input, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Container } from "postcss";



export default function Register() {
    const { auth } = useServices();
    const [activeUser] = useActiveUser();
    const isLoggedIn = useIsLoggedIn();
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/auth/login');
    };

    return (
        <Stack sx={{ gap: "1rem" }}>
            <Card sx={{ padding: "1rem", alignSelf: "center" }}>
                <Typography variant="h6">Register</Typography>
                <Stack sx={{ gap: "1rem" }}>
                    <TextField label="Email" type="email" placeholder="email@address.ext" variant="outlined"></TextField>
                    <TextField label="Username" type="text" placeholder="your-cool-username" variant="outlined"></TextField>
                    <TextField label="Password" type="password" placeholder="1234" variant="outlined"></TextField>
                    <TextField label="Password Confirmation" type="password" placeholder="1234" variant="outlined"></TextField>
                    <Button variant="contained" color="success">Register</Button>
                    <Typography>Already have an account? <Button variant="outlined" onClick={() => handleLoginClick()}>Login</Button></Typography>
                </Stack>
            </Card>
        </Stack>
    )
}
