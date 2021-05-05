import { updateHack, getHackDetails } from "../api/crud.js";
import { html } from "./imported/importedLibraries.js";

const editTemplate = (data, editFunction) => html`
<section id="edit-meme">
    <form @submit=${editFunction} id="edit-form">
        <h1>Edit Hack</h1>
        <div class="container">
            <label for="title">Name</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value=${data.name}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                ${data.description}
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${data.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Hack">
        </div>
    </form>
</section>`

export async function showEdit(context) {
    const data = await getHackDetails(context.params.id);
    context.render(editTemplate(data, editFunction))

    async function editFunction(e){
        e.preventDefault();

        let name = document.getElementById("title").value;
        let imageUrl = document.getElementById("imageUrl").value;
        let description = document.getElementById("description").value;

        if(name == "" || imageUrl == "" || description == ""){
            alert("All fields are reuired!");
            return;
        }

        if(description < 6){
            alert("Description must be at least 6 characters long!");
            return;
        }

        if(!imageUrl.startsWith("http")){
            alert("Invalid URL!");
            return;
        }


        await updateHack(context.params.id, {name, imageUrl, description});
        context.page.redirect(`/details/${context.params.id}`);

        document.getElementById("title").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("description").value = "";
    }
    
}