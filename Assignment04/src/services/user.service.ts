import axios from 'axios';

export async function signUp(username: string, password: string) {
    try{
        const response = await axios.post('http://localhost:9090/users', {username, password});
        console.log("Sign up successful: ", response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export async function login(username: string, password: string) {
    try{
        const response = await axios.post('http://localhost:9090/login', {username, password});
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
        console.log("Login failed: ", response.data);
        return null;
    }
    catch(error){
        console.log(error);
    }
}

export function persistUser(username: string, token: string){
    localStorage.setItem("user", JSON.stringify({username, token}));
}