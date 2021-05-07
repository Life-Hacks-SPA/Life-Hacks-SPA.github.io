import {logout} from "../api/crud.js";
import { page }from "../imported/importedLibraries.js";
import { showNotification } from './notification/notification.js';

export function logoutFunc(){
    let username = sessionStorage.getItem("username");
    document.querySelector(".user")
        .addEventListener("click", async (e) => {
            if(e.target.textContent == 'Logout'){
                e.preventDefault();
                await logout();
                sessionStorage.clear();
                page.redirect("/");
                showNotification(`Goodbye, ${username}`, "infoBox");
            }
        })
}