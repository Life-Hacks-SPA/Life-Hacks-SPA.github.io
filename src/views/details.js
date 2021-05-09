import {
    getHackDetails,
    deleteHack,
    getAllCommnets,
    editComment,
    deleteComment
} from "../api/crud.js";
import { html } from "../imported/importedLibraries.js";
import { loadingTemplate } from "../animations/loadingGif.js";
import { showNotification } from './notification/notification.js';


const detailsTemplate = (data, deleteFunction, comments) => html`
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
            ` : html`<h4>Autor: <span id="autor">${data.owner.username}</span></h4>`}
        </div>

    </div>
    <div id="hack-comments">
        <h2>Comments</h2>
        ${comments.length > 0 ? comments.map(curComment) : html`There are no comments yet, be the first!`}
        ${sessionStorage.getItem("personId") !== null ? html`
            <input id="send-comment" placeholder="Add comment" name="send" type="text">
            <button id="add" class="registerbtn button">Add</button>
        ` : ""}
    </div>
</section>
`

const curComment = (e) => html`
<div class="comment-wrapper">
    <h3>${e.username}</h3>
    <p id="content">${e.value}</p>
    ${e.owner.objectId == sessionStorage.getItem("personId") ? html`
    <button class="button warning">Edit</button>
    <button class="button danger">Delete</button>
    ` : ""}
</div>`

export async function showDetails(context) {
    context.render(loadingTemplate)
    console.log(context.params.id)
    //const data = await getHackDetails(context.params.id);
    let [data, comments] = await Promise.all([
        getHackDetails(context.params.id),
        getAllCommnets(context.params.id)
    ]);


    console.log(Object.values(comments)[0]);

    context.render(detailsTemplate(data,
        deleteFunction,
        Object.values(comments)[0]),);

    async function deleteFunction(e) {
        e.preventDefault();

        let conf = confirm("Are you sure to delete this post?");

        if (conf) {
            await deleteHack(data.objectId);
            context.page.redirect("/all-hacks");
            return;
        }
    }
}