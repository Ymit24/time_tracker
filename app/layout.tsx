"use client"
import { AppBar, Avatar, Box, Button, Container, CssBaseline, IconButton, Menu, MenuItem, NoSsr, ThemeProvider, Toolbar, Tooltip, Typography, createTheme } from '@mui/material'
import './globals.css'
import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'
import { TopNavBar } from './TopNavBar'
import { DefaultServices, Services, ServicesProvider } from './providers/ServicesProvider'
import { BackendAuthService } from './services/AuthService'

const inter = Inter({ subsets: ['latin'] })

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const services = useRef<Services>(DefaultServices);
    return (
        <html lang="en">
            <body className={inter.className}>
                <NoSsr>
                    <ThemeProvider theme={darkTheme}>
                        <ServicesProvider services={services.current}>
                            <TopNavBar />
                            <CssBaseline />
                            <Container maxWidth='md' sx={{ marginY: '20px' }}>
                                {children}
                            </Container>
                        </ServicesProvider>
                    </ThemeProvider>
                </NoSsr>
            </body>
        </html>
    )
}
