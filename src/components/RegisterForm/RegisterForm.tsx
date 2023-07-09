import Link from "@components/Link";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useServices } from "@providers/ServicesProvider";

const schema = z.object({
    email: z.string().email(),
    username: z.string().min(1, { message: 'Required' }).min(5, { message: 'Must be at least 5 characters long' }),
    password: z.string().min(1, { message: 'Required' }).min(5, { message: 'Must be at least 5 characters long' }),
    password_confirm: z.string().min(1, { message: 'Required' }).min(5, { message: 'Must be at least 5 characters long' }),
}).refine((data) => data.password === data.password_confirm, {
    message: 'Passwords must match',
    path: ['password_confirm']
});

type FormSchema = z.infer<typeof schema>;

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
        mode: 'onTouched',
        resolver: zodResolver(schema)
    });

    const { auth } = useServices();

    const onSubmit = async (data: FormSchema) => {
        console.log('on submit register:', data);
        const didRegister = await auth.register(data.email, data.username, data.password);
        console.log('did register', didRegister);
    };

    return (
        <Card sx={{ padding: '1rem', alignSelf: 'center' }}>
            <Typography variant="h6">Register</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ gap: "1rem" }}>
                    <TextField
                        label='Email'
                        placeholder="email@address.etc"
                        {...register('email')}
                    />
                    {errors.email && <Typography color='error'>{errors.email?.message}</Typography>}

                    <TextField
                        label='Username'
                        placeholder="first.last"
                        {...register('username')}
                    />
                    {errors.username && <Typography color='error'>{errors.username?.message}</Typography>}

                    <TextField
                        label='Password'
                        {...register('password')}
                    />
                    {errors.password && <Typography color='error'>{errors.password?.message}</Typography>}

                    <TextField
                        label='Password Confirmation'
                        {...register('password_confirm')}
                    />
                    {errors.password_confirm && <Typography color='error'>{errors.password_confirm?.message}</Typography>}

                    <Button variant='contained' type='submit'>Register</Button>
                    <Typography variant='body1'>Already have an account? <Link href='/auth/login'>Login</Link></Typography>
                </Stack>
            </form>
        </Card>
    );
}
