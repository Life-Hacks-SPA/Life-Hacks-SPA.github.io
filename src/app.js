import * as crud from "./api/crud.js"
import { settings } from "./settings/appSetings.js"
const { host } = settings();
console.log(host)

window.crud = crud;

updateUserNav();

export function updateUserNav() {
    let userDiv = document.querySelector(".user");
    let guestDiv = document.querySelector(".guest");

    let token = sessionStorage.getItem("token");

    if(token == null){
        userDiv.style.display = "none";
        guestDiv.style.display = "block";
    } else {
        userDiv.style.display = "block";
        guestDiv.style.display = "none";
        document.getElementById("greeting")
            .textContent = `Hi ${sessionStorage.getItem("username")}`;
    }
}