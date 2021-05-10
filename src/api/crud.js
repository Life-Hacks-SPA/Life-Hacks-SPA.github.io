import * as api from "./api.js"
import { updateUserNav } from "../app.js"

import { settings } from "../settings/appSetings.js"
const { host } = settings();

function createUserPointer(className, userId) {
    return {
        __type: "Pointer",
        className: `_${className}`,
        objectId: userId
    }
}

function createPointer(className, objectId) {
    return {
        __type: "Pointer",
        className: `${className}`,
        objectId
    }
}

export async function createHack(name, imageUrl, description) {
    //data = {name, imageUrl, description, owner}
    let owner = createUserPointer('User', sessionStorage.getItem("personId"));
    return await api.post(host + "/classes/Hack", { name, imageUrl, description, owner });
}

export async function createCommnet(value, hackId, username) {
    let owner = createUserPointer('User', sessionStorage.getItem("personId"))
    let hack = createPointer("Hack", hackId);

    return await api.post(host + "/classes/Comment", { value, hack, owner, username})
}


export async function getAllCommnets(hackId) {
    const queryString = JSON.stringify({ hack: createPointer('Hack', hackId) });
    return await api.get(host + '/classes/Comment?where=' + encodeURIComponent(queryString));
}

export async function editComment(commentId ,hackId, value){
    let owner = createUserPointer('User', sessionStorage.getItem("personId"))
    let hack = createPointer("Hack", hackId);
    return api.put(host + `/classes/Comment/${commentId}`, {value, hack, owner})
}

export async function deleteComment(commentId){
    return await api.del(host + `/classes/Comment/${commentId}`);
}

export async function getAllHacks() {
    return await api.get(host + "/classes/Hack");
}

export async function getHackDetails(id) {
    return await api.get(host + `/classes/Hack/${id}` + "?include=owner");
}

export async function updateHack(id, data) {
    //data = {name, imageUrl, description}
    return await api.put(host + `/classes/Hack/${id}`, data);
}

export async function deleteHack(id) {
    return await api.del(host + `/classes/Hack/${id}`);
}

export async function getHacksByProfileId() {
    let userId = sessionStorage.getItem("personId");
    const queryString = JSON.stringify({ owner: createUserPointer('User', userId) });
    return await api.get(host + '/classes/Hack?where=' + encodeURIComponent(queryString));
}

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

