
--creates the table to track all of the registered users 
--------------------------------------------------------------------------------------------

create table user (
    user_id int auto_increment,
    username text not null,
    user_password text not null,
    primary key (user_id)
);


insert into user (username, user_password) values ('nate', 'pass');
--------------------------------------------------------------------------------------------


--creates the table to track all of the posts on the website and associates each one with a post
--------------------------------------------------------------------------------------------

create table post (
    post_id int auto_increment,
    content text not null, 
    like_amount int default 0,
    post_time timestamp not null default CURRENT_TIMESTAMP,
    user_id int,
    primary key (post_id),
    constraint fk_user Foreign Key (user_id) REFERENCES user(user_id)
);

insert into post (content, user_id) values ('hello eveyone', 1);


--------------------------------------------------------------------------------------------