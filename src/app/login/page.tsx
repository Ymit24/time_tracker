"use client"
import LoginForm from "@components/LoginForm";
import { LoginFormSchema } from "@components/LoginForm/LoginForm";
import { Stack } from "@mui/material";
import { useServices } from "@providers/ServicesProvider";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function Login() {
    const { auth } = useServices();
    const router = useRouter();

    const onSubmit = async (data: LoginFormSchema) => {
        enqueueSnackbar('Logging in..', { variant: 'info' });
        const didLogin = await auth.login(data.email, data.password);
        if (didLogin) {
            enqueueSnackbar('Logged in successfully!', { variant: 'success' });
            router.push('/');
        } else {
            enqueueSnackbar('Failed to log in!', { variant: 'error' });
        }
    };
    return (
        <Stack sx={{ gap: "1rem" }}>
            <LoginForm onSubmit={onSubmit} />
        </Stack>
    );
}
