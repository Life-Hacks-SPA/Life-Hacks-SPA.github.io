import {logout} from "../api/crud.js";
import page from "../../node_modules/page/page.mjs";

export function logoutFunc(){
    document.querySelector(".user")
        .addEventListener("click", async (e) => {
            if(e.target.textContent == 'Logout'){
                e.preventDefault();
                await logout();
                sessionStorage.clear();
                page.redirect("/")
            }
        })
}