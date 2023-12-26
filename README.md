# MircroBloggingWebsite
x500: reckt007

To launch the website:
    -first you must have a umn.edu login
    -then open a terminal and run the command node tunnel.js
    -follow the login instructions until connected through the tunnel
    -next open another terminal
    -run the command node server.js
    -then load up a browser of choice and navigate to this url: http://localhost:4131/
    -the website should now be fully functional

Features Implemented: 
    Recent Posts view
    Posts by like-count view
    Post creation
    Post editing
    Post deleting
    Post liking
    User login
    User account creation
    User log out 
    User edit/delete verification
    User post association
    Page Pagination

page endpoints:
    "/" -> homepage
    "/create" -> create a post page
    "/profile" -> the all of the posts on that account
    "/login" -> login page
    "/create_account" -> create an account page
    "/failed_login: -> failed login page

http post endpoints:
    "/log_out" -> logs the user log_out
    "/create_account" -> creates a new user account with a unique user name
    "/authorize" -> verifies a user login credentials and logs them in
    "/create" -> creates a new user post
    "/verify" -> verifies the user identity matches a certain post for edit and delete permission
    "/api/post" -> updates a edited post
    "/sort" -> sorts the posts to be in like or recent decending order
    "/api/like" -> adds a like to a user post

http delete endpoints: 
    "api/post" -> deletes a post 


