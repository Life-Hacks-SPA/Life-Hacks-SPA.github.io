import * as api from "./api.js"
import {updateUserNav} from "../app.js"

import { settings } from "../settings/appSetings.js"
const { host } = settings();

export async function createHack(name, imageUrl, description) {
    //data = {name, imageUrl, description, owner}
    let owner = {
        __type: "Pointer", 
        "className": "_User", 
        objectId: sessionStorage.getItem("personId")
    }
    return await api.post(host + "/classes/Hack", {name, imageUrl, description, owner});
}

export async function getAllHacks() {
    return await api.get(host + "/classes/Hack");
}

export async function getHackDetails(id) {
    return await api.get(host + `/classes/Hack/${id}`);
}

export async function updateHack(id, data) {
      //data = {name, imageUrl, description}
    return await api.put(host + `/classes/Hack/${id}`, data);
}

export async function deleteHack(id) {
    return await api.del(host + `/classes/Hack/${id}`);
}

// export async function getMyHack(){
//     let userId = sessionStorage.getItem("personId");
//     return await api.get(host + `/data/`);
// }

export async function login(username, password) {
    const result = await api.post(host + "/login", { username, password });
    sessionStorage.setItem("token", result.sessionToken);
    sessionStorage.setItem("personId", result.objectId);
    sessionStorage.setItem("username", username);
    updateUserNav();
}

export async function register(email, username, password) {
    const result = await api.post(host + "/users", { email, username, password });
    sessionStorage.setItem("token", result.sessionToken);
    sessionStorage.setItem("personId", result.objectId);
    sessionStorage.setItem("username", username);
    updateUserNav()
}

export async function logout() {
    await api.post(host + "/logout", {});
    sessionStorage.clear();
    updateUserNav();
}

