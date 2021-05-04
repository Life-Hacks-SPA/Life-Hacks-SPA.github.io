import * as crud from "./api/crud.js";
window.crud = crud;
import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js"

import { showAllHacks } from "./views/allHacks.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showProfile } from "./views/profile.js";
import { showRegister } from "./views/register.js";

page('/all-hacks', renderMiddleware, showAllHacks);
page('/create', renderMiddleware, showCreate);
page('/details/:id', renderMiddleware, showDetails);
page('/edit/:id', renderMiddleware, showEdit);
page('/home', renderMiddleware, showHome);
page('/login', renderMiddleware, showLogin);
page('/my-prolife', renderMiddleware, showProfile);
page('/register', renderMiddleware, showRegister);

updateUserNav();

if(sessionStorage.getItem("token") == null){
    page.start("/home");
} else {
    page.start("/all-hacks");
}

function renderMiddleware(context, next) {
    context.render = (content) => render(content, document.querySelector("main"));
    next();
}

export function updateUserNav() {
    let userDiv = document.querySelector(".user");
    let guestDiv = document.querySelector(".guest");

    let token = sessionStorage.getItem("token");

    if (token == null) {
        userDiv.style.display = "none";
        guestDiv.style.display = "block";
    } else {
        userDiv.style.display = "block";
        guestDiv.style.display = "none";
        document.getElementById("greeting")
            .textContent = `Hi ${sessionStorage.getItem("username")}`;
    }
}