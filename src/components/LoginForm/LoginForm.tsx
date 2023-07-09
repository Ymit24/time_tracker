import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from '@components/Link';

type Form = {
    email: string,
    password: string,
};

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();

    const onSubmit = (data: Form) => {
        console.log('on submit login:', data);
    };

    return (
        <Card sx={{ padding: '1rem', alignSelf: 'center' }}>
            <Typography variant="h6">Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ gap: "1rem" }}>
                    <TextField
                        label='Email'
                        placeholder="email@address.etc"
                        {...register('email', { required: true })}
                    />
                    {errors.email?.type === 'required' && <Typography variant="body2" color='error'>Email is required</Typography>}

                    <TextField
                        label='Password'
                        {...register('password', { required: true, minLength: 5 })}
                    />
                    {errors.password?.type === 'required' && <Typography variant="body2" color='error'>Password is required</Typography>}
                    {errors.password?.type === 'minLength' && <Typography variant="body2" color='error'>Password must be at least 5 characters</Typography>}

                    <Button variant='contained' type='submit'>Login</Button>
                    <Typography variant='body1'>Dont have an account? <Link href='/auth/register'>Register</Link></Typography>
                </Stack>
            </form>
        </Card>
    );
};
