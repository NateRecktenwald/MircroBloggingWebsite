const express = require('express')
const app = express()
const port = 4131

app.set("views", "pages");
app.set("view engine", "pug");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const data = require('./data.js');

//gloabl variables
let username = "";
let password = "";
let user_id = "";
let logged_in = false;
let login_through_create = false;
let recent = true;

//get static files
app.use("/resources", express.static("resources"));

//get all the different pages
app.get("/", async (req, res) => {
    if(recent) {
        var posts = await data.getPostTime();
    }
    else {
        var posts = await data.getPostLike();
    }
    res.render("homepage.pug", {logged_in, posts});
});

app.get("/create", (req, res) => {
    if(logged_in) {
        res.render("create.pug", {username});
    }
    else {
        login_through_create = true;
        res.render("login.pug");
    }
});

app.get("/profile", async (req, res) => {
    if(recent) {
        var posts = await data.getPostTimeProfile(user_id);
    }
    else {
        var posts = await data.getPostLikeProfile(user_id);
    }
    res.render("profile.pug", {logged_in, posts});
});

app.get("/login", (req, res) => {
    res.render("login.pug");
});

app.get("/create_account", (req, res) => {
    res.render("create_account.pug");
});

app.get("/failed_login", (req, res) => {
    res.render("failed_login.pug");
});

app.post("/log_out", (req, res) => {
    username = "";
    password = "";
    user_id = "";
    logged_in = false;
    res.status(200).redirect("/");
});

app.post("/create_account", async (req, res) => {
    if (req.body != null) {
        const user = req.body.login_username.replace("<", "&lt");
        const pass = req.body.login_password.replace("<", "&lt");
        let result = await data.getUserNames(req.body.login_username);
        if(result == 1) {
            await data.addUser(user, pass);
            res.status(200).redirect("/login");
        }
        else {
            res.render("create_account_failed.pug");
        }
    }
    else {
        res.status(400).send("sent bad data to add a user");
    }
});

app.post("/authorize", async (req, res) => {
    if (req.body != null) {
        const user = req.body.login_username.replace("<", "&lt");
        const pass = req.body.login_password.replace("<", "&lt");
        let result = await data.checkUser(user, pass);
        if (result > -1) {
            username = user;
            password = pass;
            user_id = result;
            logged_in = true;
            if(login_through_create) {
                res.status(200).redirect("/create");
            }
            else {
                res.status(200).redirect("/");
            }
        }
        else {
            res.status(400).redirect("/failed_login");
        }
    }
    else {
        res.status(400).send("sent bad data to login a user");
    }
});

app.post("/create", async (req, res) => {
    if (req.body != null) {
        const text = req.body.new_user_post.replace("<", "&lt");
        await data.createPost(text, user_id);
        res.status(200).redirect("/");
    }
    else {
        res.status(400).send("sent bad data to login a user");
    }
});

app.delete("/api/post", async (req, res) => {
    if(req.header('Content-type') == 'application/json') {
        if(req.body.user_id == user_id) {
            await data.deletePost(req.body.post_id)
            res.sendStatus(200);
            
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(400);
    }
});

app.post("/verify", async (req, res) => {
    if(req.header('Content-type') == 'application/json') {
        if(req.body.user_id == user_id) {
            let result = await data.getPost(req.body.post_id);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify({result}));
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(400);
    }
});

app.post("/api/post", async (req, res) => {
    if(req.body != null) {
        const text = req.body.edited_post.replace("<", "&lt");
        await data.updatePost(req.body.post_id, text);
        res.redirect("/");
    }
    else {
        res.sendStatus(400);
    }
});

app.post("/sort", (req, res) => {
    if(req.body.input == "recent_home") {
        recent = true;
        res.redirect("/");
    }
    else if (req.body.input == "likes_home") {
        recent = false;
        res.redirect("/");
    }
    else if (req.body.input == "recent_profile") {
        recent = true;
        res.redirect("/profile");
    }
    else {
        recent = false;
        res.redirect("/profile");
    }
});

app.post("/api/like", async (req, res) => {
    if(req.body != null) {
        await data.addLike(req.body.post_id);
        let amount = await data.getLikeAmount(req.body.post_id);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(amount[0]));
    }
    else {
        res.sendStatus(400);
    }
});


//return 404 if all the paths above dont catch the request
app.use((req, res, next) => {
    res.status(404).send("Couldn't find that file");
});

//runs the server
app.listen(port , () => {
    console.log(`Example app listening on port ${port}`);
});