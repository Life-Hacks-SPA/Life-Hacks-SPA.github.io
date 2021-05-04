import { register } from "../api/crud.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const registerTemplate = (registerFunction) => html`
<section id="register">
    <form @submit=${registerFunction} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`

export async function showRegister(context) {
    context.render(registerTemplate(registerFunction))

    async function registerFunction(e){
        e.preventDefault();
        
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let rePass = document.getElementById("repeatPass").value;

        if(username == "" || email == "" || password == ""){
            alert("All fields are reuired!");
            return;
        }

        if(!email.includes("@")){
            alert("Invalid email!");
            return;
        }

        if(password.length < 6){
            alert("Password must be at least 6 characters long");
            return;
        }

        if(password !== rePass){
            alert("Passwords must be idenecal");
            return;
        }

        
        await register(email, username, password);
        context.page.redirect("/all-hacks");
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("repeatPass").value = "";
    }
}