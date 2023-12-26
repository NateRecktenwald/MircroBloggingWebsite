
const next = document.getElementById("next_page_button");
const prev = document.getElementById("previous_button");


const posts = document.querySelectorAll("div.post");

let curr_page = 1;
const num_pages = Math.ceil(posts.length / 10);

//button handlers
const buttonStatus = () => {
    if(curr_page == 1) {
        prev.classList.add("disable");
    }
    else {
        prev.classList.remove("disable");
    }

    if(curr_page == num_pages) {
        next.classList.add("disable");
    }
    else {
        next.classList.remove("disable");
    }
}

const setPage = async (new_page) => {
    curr_page = new_page;
    buttonStatus();

    const content = document.getElementById("content");
    const children = content.children;

    const curr_range_start = (curr_page - 1) * 10;
    const curr_range_end = curr_page * 10;
    const num_buttons = 2 * num_pages;

    for(let i = 1; i < children.length; i++) {
        if(i >= curr_range_start && i < curr_range_end) {
            document.getElementById(children[i].id).classList.remove("hidden");
        }
        else {
            document.getElementById(children[i].id).classList.add("hidden");
        }
    }
}


window.addEventListener("load", () => { 
    setPage(1);

    prev.addEventListener('click', () => {
        window.scrollTo(0, 0);
        setPage(curr_page - 1);
    })

    next.addEventListener('click', () => {
        window.scrollTo(0, 0);
        setPage(curr_page + 1);
    })
});

setInterval(() => {
    setPage(curr_page);
}, 1000);