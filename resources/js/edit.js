
const edit_content = document.getElementById("content");
const edit_children = edit_content.children;
let limit_one_edit = false;

limit_one_edit = false;
for(let i = 1; i < edit_children.length; i++) {
    try {
        let curr_button = document.getElementById(edit_children[i].children[2].id);

        async function editPost() {
            
            if(!limit_one_edit) {
                limit_one_edit = true;
                const user_id = curr_button.id.split(" ")[1];
                const post_id = curr_button.id.split(" ")[2];

                const response = await fetch("/verify", { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json"}, 
                    body: JSON.stringify({"user_id": user_id, "post_id": post_id})});

                if(response.status != 200) {
                    if (response.status == 401) {
                        console.log("cannot due that as you do not own the post you can only edit posts you create");
                    }
                    else {
                        console.log("invalid fetch sent");
                    }
                }
                else {

                    const edit_box = document.getElementById(`wrapper ${i - 1}`);

                    //gets the text content and removes the old paragraph element
                    const result = await response.json();
                    const curr_text = result.result[0].content;
                    edit_box.removeChild(edit_box.firstElementChild);

                    //creates a hidden input to send the post id to the server
                    const hidden_input = document.createElement("input");
                    hidden_input.setAttribute("name", "post_id");
                    hidden_input.setAttribute("value", post_id);
                    hidden_input.setAttribute("type", "hidden");
                    edit_box.appendChild(hidden_input);

                    //creates the text area to edit the post
                    const text_element = document.createElement("textarea");
                    text_element.setAttribute("maxLength", "500");
                    text_element.setAttribute("id", "edited_post");
                    text_element.setAttribute("name", "edited_post");
                    edit_box.appendChild(text_element);
                    document.getElementById("edited_post").value = curr_text;

                    //creates the button to click when done editing
                    const update_post = document.createElement("button");
                    update_post.setAttribute("type", "submit");
                    update_post.setAttribute("id", "update_post_button");
                    update_post.innerText = "done";
                    edit_box.appendChild(update_post);
                }
            }
            
        }
        curr_button.addEventListener('click', editPost);
    }
    catch {
        continue;
    }

    
    
}