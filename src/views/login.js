import { login } from "../api/crud.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const loginTemplate = (loginFunc) => html`
<section @submit=${loginFunc} id="login">
    <form id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input id="username" placeholder="Enter Username" name="username" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`

export async function showLogin(context) {
    context.render(loginTemplate(loginFunc));

    async function loginFunc(e){
        e.preventDefault();
        
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if(username == "" || password == ""){
            alert("Username or Password must be filled!")
            return;
        }

        console.log(username + " " + password)
        await login(username, password);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        context.page.redirect("/all-hacks");
    }
}