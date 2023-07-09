"use client"
import { Stack } from "@mui/material";
import { useServices } from "@providers/ServicesProvider";
import { enqueueSnackbar } from "notistack";
import RegisterForm from "@components/RegisterForm";
import { RegisterFormSchema } from "@components/RegisterForm";
import { useRouter } from "next/navigation";


export default function Register() {
    const { auth } = useServices();
    const router = useRouter();

    const onSubmit = async (data: RegisterFormSchema) => {
        enqueueSnackbar('Registering..', { variant: 'info' });
        const didRegister = await auth.register(data.email, data.username, data.password);
        if (didRegister) {
            enqueueSnackbar('Registered Successfully!', { variant: 'success' });
            router.push('/');
        } else {
            enqueueSnackbar('Failed to Register!', { variant: 'error' });
        }
    };
    return (
        <Stack sx={{ gap: "1rem" }}>
            <RegisterForm onSubmit={onSubmit} />
        </Stack>
    )
}
