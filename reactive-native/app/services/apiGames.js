import axios from "axios";
import { useAuth } from "../contexts/useAuth";

const GmssAPI = "http://localhost:8082/project/v1"

export function getToken(){
    const { token } = useAuth();
    return token;
}

const http = axios.create({
    baseURL: GmssAPI,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

export async function postGms(games, token){
    const headerConfig = {headers: { "Authenticator": `Bearer ${token}` }}
    console.log(headerConfig);
    const{ data } = await http.post("/games", games, headerConfig);
    console.log("reste");
    return data;
}

export async function getGms(){
    const { data } = await http.get("/games");
    return data;
}

export async function delGms(id) {
    await http.delete(`/games/${id}`);
}
