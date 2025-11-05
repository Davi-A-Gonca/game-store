import axios from "axios";
import { exibirMensagem } from '../errors/showError';

const GmssAPI = "http://localhost:8082/project/v1"

const http = axios.create({
    baseURL: GmssAPI,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

export function createJson(oldJson){
    const nameGame = oldJson.gameName;
    const price = oldJson.newPrice;
    const genre = oldJson.newGenre;
    const ageRating = oldJson.ageRating;
    const console = oldJson.consol;
    const synopsis = "";
    const data = {nameGame, price, genre, ageRating, console, synopsis}
    return data;
}

export async function postGms(filter){
    const newFilter = createJson(filter);
    const{ data } = await http.post("/games/find", newFilter);
    return data;
}

export async function getGms(){
    const { data } = await http.get("/games");
    return data;
}

export async function delGms(id) {
    await http.delete(`/games/${id}`);
}
