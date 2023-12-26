const like_content = document.getElementById("content");
const like_children = content.children;

for(let i = 1; i < children.length; i++) {

    try {
        let curr_button = document.getElementById(like_children[i].children[5].id);
        const curr_like_text = document.getElementById(like_children[i].children[6].id);

        async function removePost() {
            
            const post_id = curr_button.id.split(" ")[1];

            const response = await fetch("/api/like", { 
                method: "POST", 
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify({"post_id": post_id})});

            if(response.status == 200) {
                const res = await response.json();
                curr_like_text.innerText = res.like_amount;
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