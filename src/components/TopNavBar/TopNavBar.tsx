"use client";
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import { useServices } from "@providers/ServicesProvider";
import { useRouter } from "next/navigation";
import { useActiveUser, useIsLoggedIn } from "hooks/auth";
import { enqueueSnackbar } from "notistack";
import Link from "next/dist/client/link";


export default function TopNavBar() {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenUser = (e: MouseEvent<HTMLElement>) => {
        setIsUserOpen(true);
        setUserAnchorEl(e.currentTarget);
    };

    const handleCloseUser = () => {
        setIsUserOpen(false);
        setUserAnchorEl(null);
    }

    const { auth } = useServices();

    const isLoggedIn = useIsLoggedIn();
    const [activeUser] = useActiveUser();

    const router = useRouter();

    const onLogin = async () => {
        setIsUserOpen(false);
        router.push('/login');
    };

    const onLogout = async () => {
        await auth.logout();
        enqueueSnackbar('Logged out!', { variant: 'warning' });
        router.push('/register');
    };

    return (
        <AppBar position='static'>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href='/'>
                            TIME TRACKER
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Account">
                            <IconButton sx={{ p: 0 }} onClick={(e) => handleOpenUser(e)}>
                                <Avatar alt="USERNAME" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            keepMounted
                            open={isUserOpen}
                            anchorEl={userAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            onClose={() => handleCloseUser()}
                        >
                            <MenuItem disabled>
                                {
                                    isLoggedIn
                                        ? <Typography>{activeUser?.username}</Typography>
                                        : <Typography>Guest</Typography>
                                }
                            </MenuItem>
                            <MenuItem>
                                <Typography>Profile</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Settings</Typography>
                            </MenuItem>
                            <MenuItem>
                                {
                                    isLoggedIn
                                        ? <Button variant="contained" color="error" onClick={() => onLogout()}>Logout</Button>
                                        : <Button variant="contained" color="primary" onClick={() => onLogin()}>Login</Button>
                                }
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>);
}
