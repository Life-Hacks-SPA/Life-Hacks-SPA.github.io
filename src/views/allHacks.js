import { getAllHacks } from "../api/crud.js";
import { html } from "../../node_modules/lit-html/lit-html.js"

const allHacks = (data) => html`
<section id="meme-feed">
    <h1>All Hacks</h1>
    <div id="memes">
        ${data.length > 0 ? data.map(curHack) : html`
        <p class="no-memes">No hacks in database.</p>
        `}
    </div>
</section>
`

const curHack = (e) => html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${e.name}</p>
                    <img class="meme-image" alt="hack-img" src="${e.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${e.objectId}">Details</a>
                </div>
            </div>
        </div>`


export async function showAllHacks(context) {
    let { results } = await getAllHacks();
    context.render(allHacks(results));
}

