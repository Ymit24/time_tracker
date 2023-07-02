import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";


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

    return (
        <AppBar position='static'>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        TIME TRACKER
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
                            <MenuItem onClick={() => handleCloseUser()}>
                                <Typography>Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleCloseUser()}>
                                <Typography>Settings</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleCloseUser()}>
                                <Button variant="contained" color="error">Logout</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>);
}
