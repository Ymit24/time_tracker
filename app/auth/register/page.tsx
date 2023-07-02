"use client"

import { useServices } from "@/app/providers/ServicesProvider";
import { useActiveUser, useIsLoggedIn } from "@/app/services/AuthService";
import { Box, Button, Card, Input, Stack, TextField, Typography } from "@mui/material";
import { Container } from "postcss";

export default function Register() {
    const { auth } = useServices();
    const [activeUser] = useActiveUser();
    const [isLoggedIn] = useIsLoggedIn();
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
                </Stack>
            </Card>
            <Typography>Username: {activeUser?.username}</Typography>
            {
                isLoggedIn
                    ? <Button sx={{ maxWidth: '250px' }} variant="outlined" color="warning" onClick={() => {
                        auth?.logout()
                    }}>Logout</Button>
                    : <Typography variant="body2" color="text.info">Not Logged In</Typography>
            }
        </Stack>
    )
}
