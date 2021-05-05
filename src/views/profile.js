import { getHacksByProfileId } from "../api/crud.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const profileTemplate = (data) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/male.png">
        <div class="user-content">
            <p>Username: ${sessionStorage.getItem("username")}</p>
            <p>My posts count: ${data.length}</p>
            ${generateEditOption(data)}
        </div>
    </article>
    <h1 id="user-listings-title">User Life Hacks</h1>
    <div class="user-meme-listings">
        ${data.length > 0 ? data.map(curHack) : html`
        <p class="no-memes">This user has no posts yet!</p>
        `}
    </div>
</section>`

const curHack = (e) => html`
<div class="user-meme">
    <p class="user-meme-title">${e.name}</p>
    <img class="userProfileImage" alt="hack-img" src="${e.imageUrl}">
    <a class="button" href="/details/${e.objectId}">Details</a>
</div>`

function generateEditOption(data) {
    if (data.length > 0) {
        return html`<input type="submit" class="registerbtn button" value="Edit">`
    }
}

export async function showProfile(context) {
    const result = await getHacksByProfileId(sessionStorage.getItem("personId"));
    const data = Object.values(result)[0];

    context.render(profileTemplate(data))
}