import { getHackDetails, deleteHack } from "../api/crud.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = (data, deleteFunction) => html`
<section id="meme-details">
    <h1>${data.name}</h1>

    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${data.imageUrl}">
        </div>
        <div class="meme-description">

            <p>${data.description}</p>

            ${data.owner.objectId == sessionStorage.getItem("personId") ? html`
            <a class="button warning" href="/edit/${data.objectId}">Edit</a>
            <button @click=${deleteFunction} class="button danger">Delete</button>
            ` : ""}
        </div>
    </div>
</section>
`

export async function showDetails(context) {
    const data = await getHackDetails(context.params.id)
    context.render(detailsTemplate(data, deleteFunction));

    async function deleteFunction(e) {
        e.preventDefault();
        console.log(e);

        let conf = confirm("Are you sure to delete this post?");

        if(conf){
            await deleteHack(data.objectId);
            context.page.redirect("/all-hacks");
            return;
        }
    }
}