import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from '@components/Link';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export interface Props {
    onSubmit: (data: LoginFormSchema) => void,
}

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Required' }).min(5, { message: 'Must be at least 5 characters long' }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export const LoginForm = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginFormSchema)
    });

    return (
        <Card sx={{ padding: '1rem', alignSelf: 'center' }}>
            <Typography variant="h6">Login</Typography>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <Stack sx={{ gap: "1rem" }}>
                    <TextField
                        label='Email'
                        placeholder="email@address.etc"
                        {...register('email')}
                    />
                    {errors.email && <Typography color='error'>{errors.email?.message}</Typography>}

                    <TextField
                        label='Password'
                        type='password'
                        {...register('password')}
                    />
                    {errors.password && <Typography color='error'>{errors.password?.message}</Typography>}

                    <Button variant='contained' type='submit'>Login</Button>
                    <Typography variant='body1'>Dont have an account? <Link href='/auth/register'>Register</Link></Typography>
                </Stack>
            </form>
        </Card>
    );
};
