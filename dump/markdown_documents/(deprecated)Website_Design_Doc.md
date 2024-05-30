---
title: "(deprecated)Website Design Doc"
date: Thu Aug 17 2023 13:11:49
type: web
---
## DataBase

### Blogs

fields: \_id, date, title, id, like

-   \_id: mongodb id
-   data: the blog text
-   title: the blog title
-   id: a helper field to help load the blogs in time order
-   like: array containing the ip addresses who like the blog

### Comments

fields: \_id, user, text, date, pointer, blog, like:

-   \_id: mongodb id
-   user: comment input user
-   text: comment text
-   date: comment post date
-   pointer: array of ObjectID, which are ids of child comments

### Visitinfos

-   \_id: mongodb id
-   date: user visited date
-   country: visitor country
-   city: visitor city
-   region: visitor region
-   ip: visitor ip
-   browser: visitor browser and operating system
-   now: a time in milliseconds passed from 1970

## Backend

### Server

-   server.js

Import all the routes, and render them on specific paths.

Specify the port where backend renders on.

-   .env

The username and password to connect to MongoDB

### Routes

-   addlike.js

Patch request to update the likes for a specific comment.

Parameter: id(find id in the comment section), userIP(to append or to
remove), liked(true or false indicating whether to append or remove)

-   addliketoblog.js

Patch request to update the likes for a blog

Parameter: id(find id in the blog section), userIP(to append or to
remove), liked(true or false indicating whether to append or remove)

Very similar to addlike except it find blog to update(in addlike it find
comment to update the likes)

-   blog.js

Get Blog JSON

Parameter:/

-   changechildid.js

Patch request to update comment structure. When called, it point the
parent comment to the child comment, thus forming nested comments.
Basically append the childid to the parent id pointer array

Parameter: parentid, childid

-   comment.js

Post Function: Submit a comment to the backend(only submit doesn\'t make
the structure nested in this function). Blog means unique identifier for
each blog, it use date for the blog identifier. In the \"leaveamessage\"
section the blog defaults to 00000000. Basically like and pointer gets
default of 0 when submitted.

Parameter: user,comment,date,blog(each blog unique identifier),like

Get Function: Return the comments by quering the blog(unique identifier)

Parameter: blog

-   getvisitinfo.js

Not Used (may use in future but not deleted now)

Get user\'s ip address

-   visitinfo.js

Get Function:

Get all user visit information

Parameter: /

Post Function:

Post user\'s information in the backend. The \"now\" variable is used to
filter out repeated requests

Parameter: date, country, city, region, ip, browser, now(time in
milliseconds)

### Models

Explained in Database

-   blog.model.js

-   comment.model.js

-   visitinfo.model.js

## Frontend

### Index.js {#indexjs}

This file imports all the files and render them on corresponding paths.
The code first make a get request to the backend, which returns all the
blogs, and renders each of them in specific urls. Everything except the
embed files have a navbar and header. The embed files have no navbar and
header, only html.

### Public

This folder contains a few public files, including site icon, QR code,
robots.txt, and sitemap.xml

### Components

This folder contains all paths for the html

-   blog.js

This first make a get request to \${backendurl}/blog, getting the blog,
then return the blog page (previewing all the blogs with date, first 150
characters, and title)

-   leaveamessage.js

This returns 2 components, input box(commentinputbox) and comment
box(getcomment), depending on whether it is on a blog page or the
\"leaveamessage\" page. blogcomment is used to determine whether it\'s a
blog and blog is the unique identifier for each blog(the date posted)

Parameter: blog, blogcomment

-   visitinfo.js

PostVisitInfo

Get from <https://ipapi.co/json> (which returns everything about the
user, the user ip, the user browser, etc), then check if user visit in
the past hour by submitting a get request, then if user hasn\'t visited
post the information to the backend. Set the IP(global variable across
files) to be the user IP get from <https://ipapi.co/json>.

GetVisitInfo

Get the user information from the backend and write it on the page.

#### Components/static

This folder contains all the static elements

-   404.js

A 404 Page using ASCII art to print out 404, and contains a dinosaur
game and input box

-   cv.js

A pdf containing my resume.

-   footer.js

Footer for the site, rendered on every page, and contains my social
media accounts with icons.

-   navbar.js

NavBar for the site, rendered on every page, and contains links to get
around the site

-   projects.js

Contains notable projects I did

-   unofficialbio.js

Contains bio

### Config

-   config.js

Config backendurl

-   global.js

Export IP as a global variable

### Htmlelements

This folder contains html elements, which are special elements to be
rendered

-   commentbox.js

This file specifies the css style, and returns the comment body and
likebutton and replybutton, in the process passing the id and
blog(unique identifier)

Parameter: id, blog

-   commentinputbox.js

This element is used to prompt a commentbox and a submit button, for the
user to submit the comment. Once clicked it will submit the button by
calling submitcomment, which is in the util directory, with the ip and
blog passed from the parent files.

Parameter: id, blog

-   likebutton.js

This function uses the ip passed from Then based on whether it is a blog
page or leaveamessage page, which is the parameter the function passed
from the singleblog.js, the function make a path request on either
\"\${backendurl}/addlike\" or \"\${backendurl}/addliketoblog\" to either
add a like or delete a like. The function add or delete the like based
on the isliked variable on every change.

This file uses states and if clicked on the button will update the
states liked(true or false) and likes, which is a number representing
the number of likes.

Parameter: id, like, blog

-   PreviewCard.js

This file is for rendering blog overview. It uses card element from
react-bootstrap and put the blog date, blog title, first 150 characters
of blog text in the card.

Parameter: date, text, title

-   replybutton.js

This is a replybutton. If clicks the reply then triggers a
commentinputbox. The parameters are just passed on and not used here.

Parameter: id, blog

-   SingleBlog.js

This file is for rendering single blogs. It uses card element from
react-bootstrap and put the blog date, blog title, blog text in the
html. Then it adds a like button, which is imported from likebutton.js
in the same directory.

Parameter: date, text, title, like, id

-   SingleBlogEmbed.js

This file renders the embeded blog with no navbar and footer, likebutton
or commentsection. It is used for saving as pdf. It clicks the ctrl+p
automatically after 1.5 seconds to save the html as a pdf file.

Parameter: date, text, title

### Utils

This folder contains some utility functions used across multiple files

-   adjustelementwidth.js

This file uses hook and returns the actual window width/height with
state(every time it changes it will rerender). This file also contains a
function getpaddingwidth(setwidth), which returns the paddingwidth for
the width set for the html elements(if the window width too small then
return 30, if it\'s large then return (windowwidth-setwidth)/2)

-   getcomments.js

This function gets all the comments from the backend (with appropriate
blog entry)and returns the commentbox containing all the comments.

The function first filter out the pointers which appeared as in the
childid array(filter all child), then use recursive depth first search
to find all comments in the right order and return their depth. The
function performs depth first search by following the pointer in the
childid array (which is full of Mongodb ObjectID) of the comment object
and going to the childid, then rendering the childid.

Parameter: blog(unique identifier)

-   submitcomment.js

The function first submit a post request to the backend to add the
comment, then depending on if it has a parent submit a patch request to
update the childid pointer of its parent(it no parent then parentid is
-1). The parentid and blog comes from the reply button, as the id prop
is passed into the reply button(even though it is not explicitly visible
on the html page), and then passed to the reply function. The patch
request add the childid to the parent pointer in the backend.

parameters: parentid, username, message, blog

## References

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [IPAPI Documentation](https://ipapi.co/api/)
