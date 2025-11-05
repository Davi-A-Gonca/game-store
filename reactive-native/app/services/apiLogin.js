import axios from "axios";
import { AppError } from '../errors/baseError';

const loginAPI = "http://localhost:8082/project/v1"

const http = axios.create({
    baseURL: loginAPI,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

export async function postLogin(login){
    const{ data } = await http.post("/register", login);
    return data;
}

export async function getToken(login){
    const { data } = await http.post("/login", login);
    return data;
}

export async function getLogin(){
    const { data } = await http.get("/login");
    return data;
}

export async function delLogin(id) {
    await http.delete(`/login/${id}`);
}
