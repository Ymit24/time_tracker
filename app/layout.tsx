"use client"
import { AppBar, Avatar, Box, Button, Container, CssBaseline, IconButton, Menu, MenuItem, NoSsr, ThemeProvider, Toolbar, Tooltip, Typography, createTheme } from '@mui/material'
import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { TopNavBar } from './TopNavBar'

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
    return (
        <html lang="en">
            <body className={inter.className}>
                <NoSsr>
                    <ThemeProvider theme={darkTheme}>
                        <TopNavBar />
                        <CssBaseline />
                        <Container maxWidth='md' sx={{ marginY: '20px' }}>
                            {children}
                        </Container>
                    </ThemeProvider>
                </NoSsr>
            </body>
        </html>
    )
}
