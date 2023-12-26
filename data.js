// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await
const { post } = require("request");

// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections

// this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.
var connPool = mysql.createPool({
    connectionLimit: 5, // it's a shared resource, let's not go nuts.
    host: "localhost",// this will work
    user: "C4131F23U181",
    database: "C4131F23U181",
    password: "32811", // we really shouldn't be saving this here long-term - and I probably shouldn't be sharing it with you...
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.
// you CAN change the parameters for this function. please do not change the parameters for any other function in this file.

async function addUser(username, user_password){
    await connPool.awaitQuery("insert into user (username, user_password) values (?, ?);", [username, user_password]);
}

async function deletePost(post_id){

    let result = await connPool.awaitQuery("delete from contacts where id=?;", [post_id]);

    if (result.affectedRows > 0) {
        return true;
    }
    else {
        return false;
    }
}

async function checkUser(username, user_password) {
    let result = await connPool.awaitQuery("select user_id from user where username=? AND user_password=?;", [username, user_password]);

    if(result.length > 0) {
        return result[0].user_id;
    }
    else {
        return -1;
    }
}

async function createPost(content, user_id) {
    return await connPool.awaitQuery("insert into post (content, user_id) values (?, ?)", [content, user_id]);
}

async function deletePost(post_id) {
    return await connPool.awaitQuery("DELETE FROM post where post_id = ?", [post_id]);
}

async function getPostTime() {
    return await connPool.awaitQuery("SELECT p.post_id, p.content, p.like_amount, p.post_time, u.username, p.user_id AS post FROM post p INNER JOIN user u USING(user_id) ORDER BY p.post_time DESC;");
}

async function getPostLike() {
    return await connPool.awaitQuery("SELECT p.post_id, p.content, p.like_amount, p.post_time, u.username, p.user_id AS post FROM post p INNER JOIN user u USING(user_id) ORDER BY p.like_amount DESC;");
}

async function getPostTimeProfile(user_id) {
    return await connPool.awaitQuery("SELECT p.post_id, p.content, p.like_amount, p.post_time, u.username, p.user_id AS post FROM post p INNER JOIN user u USING(user_id) where user_id = ? ORDER BY p.post_time DESC;", [user_id]);
}

async function getPostLikeProfile(user_id) {
    return await connPool.awaitQuery("SELECT p.post_id, p.content, p.like_amount, p.post_time, u.username, p.user_id AS post FROM post p INNER JOIN user u USING(user_id) where user_id = ? ORDER BY p.like_amount DESC;", [user_id]);
}

async function getPost(post_id) {
    return await connPool.awaitQuery("SELECT content from post where post_id = ?", [post_id]);
}

async function updatePost(post_id, content) {
    return await connPool.awaitQuery("UPDATE post SET content = ?, post_time = CURRENT_TIMESTAMP WHERE post_id = ?", [content, post_id]);
}

async function addLike(post_id) {
    return await connPool.awaitQuery("UPDATE post SET like_amount = like_amount + 1 WHERE post_id = ?", [post_id]);
}

async function getLikeAmount(post_id) {
    return await connPool.awaitQuery("SELECT like_amount FROM post WHERE post_id = ?", [post_id]);
}

async function getUserNames(username) {
    try {
        let result = await connPool.awaitQuery("SELECT username FROM user WHERE username = ?", [username]);
        connPool.on('error', () => {return 1;});
        if (result.length > 0) { 
            return 0;
        }
        else {
            return 1;
        }
    }
    catch {
        return 0;
    }
}

// async function addSale(message) {
//     await connPool.awaitQuery("insert into sales (content) values (?)", [message]);
// }


// async function endSale() {
//     await connPool.awaitQuery("update sales set endTime = CURRENT_TIMESTAMP where endTime is null");
// }

// async function getLastSale() {
//     let result = await connPool.awaitQuery("select * from sales order by startTime DESC limit 1");
//     return result;
// }

// async function getRecentSales() {
//     let result = await connPool.awaitQuery("select * from sales order by startTime DESC limit 3");
//     let lst = [];
//     for (let i = 0; i < result.length; i++) {
//         if(result[i].endTime != null) {
//             lst[i] = {message: result[i].content, active: false};
//         }
//         else {
//             lst[i] = {message: result[i].content, active: true};
//         }
//     }

//     return lst;
// }

module.exports = {addUser, deletePost, checkUser, createPost, getPostTime, getPostLike, getPost, updatePost,
                  getPostTimeProfile, getPostLikeProfile, addLike, getLikeAmount, getUserNames};
