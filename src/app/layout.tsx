"use client";
import { Container, CssBaseline, NoSsr, ThemeProvider, createTheme } from '@mui/material'
import { Inter } from 'next/font/google'
import { ServicesProvider } from '@providers/ServicesProvider'
import { TopNavBar } from '@components/TopNavBar'
import './globals.css'
import { SnackbarProvider } from 'notistack';

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
                        <ServicesProvider>
                            <TopNavBar />
                            <CssBaseline />
                            <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
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
