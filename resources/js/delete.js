
const content = document.getElementById("content");
const children = content.children;

for(let i = 0; i < children.length; i++) {

    try {
        let curr_button = document.getElementById(children[i].children[1].id);

        async function removePost() {
            
            const user_id = curr_button.id.split(" ")[1];
            const post_id = curr_button.id.split(" ")[2];

            const response = await fetch("/api/post", { 
                method: "DELETE", 
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify({"user_id": user_id, "post_id": post_id})});

            if(response.status == 200 || response.status == 404) {
                document.getElementById(i - 1).remove();
            }
            else if (response.status == 401) {
                console.log("cannot due that as you do not own the post you can only delete posts you create");
            }
            else {
                console.log("invalid fetch sent");
            }
            
        }

        curr_button.addEventListener('click', removePost);
    }
    catch {
        continue;
    }

    
}