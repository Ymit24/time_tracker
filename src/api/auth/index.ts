import axios from "axios";

interface LoginResponse {
    token: string,
    user: {
        ID: number,
        username: string
    }
}

export async function callLogin(email: string, password: string) {
    console.log('calling login api');
    const data: LoginResponse = await axios.post('127.0.0.1:3000/api/auth/login', {
        email,
        password,
    });
    console.log('received:', data);
    return data;
}
