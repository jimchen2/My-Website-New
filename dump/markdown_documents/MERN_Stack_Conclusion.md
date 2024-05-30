---
title: "MERN Stack Conclusion"
date: Thu Jun 23 2023 18:00:04
type: web
---
## Overview

Create a web application with frontend and backend and using libraries
and functions to connect between them.

Frontend: Html, CSS, Javascript, Jquery, React, UI (Github Page)
Backend: Axios, Express, Mongodb(Mongoose), Linux

It is easy to create a webpage with github pages/google site/wix, but
github page is static and I don\'t like Wix.

## Why I use Mern Stack

Because many online tutorials use mern stack and it is mainly based on
Javascript.

## Html, CSS

It is kind of like writing in Microsoft Word with Html and CSS, anyways,
just add bunch of tags and styles and you can get a good web page
design. As a minimalist, I am not a big fan of designing anyways.

## Jquery

Html and CSS for javascript is kind of like EasyX in C Language or
Tkinter in Python, which you can use to create better applications.

Javascript makes the webpage alive. For example, you can change classes
with Javascript with

    document.getElementsById("<someid>").innerHTML="<somehtml>"

Or add a function after button clicking by specifying

    <button onclick="somefunction()"/>

Also you can add event listener(clicking or keyboard or hand movement),
alerts, set interval for functions, for example like [this
page](https://mygame4214.github.io/2048/2048.html)

You can also add forms and input, and dynamically change the input. Also
Javascript can modify cookies, and adjust site settings according to the
cookies.

## React

React is Javascript Library.

By using the components, and you can define a kind of component and use
it again and again, like customized Button

Start React by typing

    npx create-my-app <appname>

then naviagate to index.js and change it.

By running npm start, you can see the website on localhost:3000

Also, I didn\'t use the app.js file, and I deleted all the logos and not
useful stuffs.

### Routing

First code the elements you want on a separate js file, and they should
return HTML files. For example, , then render it on a path. (Maybe you
want to render about-me on \"/aboutme\")

          root.render(
            <HashRouter>
              <NavBar />
              <Routes>
                <Route path="<somepath1>" element={<someelement> />} />
                {path}
              </Routes>
              <Footer />
            </HashRouter>

Use BrowseRouter or HashRouter (not much difference between the two for
me except HashRouter has /#/ on the URL), to construct all path of the
website. For example, if there is 3 subpages on a website(aboutme,
contact, blog), then code like:

        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/" element={<Blog />} />

### Dynamic Routing

You can also build pages (like a blog), where the page may change and be
added, build it like

    // For Loop 
    arr[i] = (
              <Route
                path={date[i]}
                element={BlogUtil(title[i], text[i], date[i])}
              />)

Then basically add the array with {} in the middle of routes

## Components and Props

Build a personal component by adding props in the function, for example,
building a button function

    const Button = (props) => {
      return (
        <div>
          <p>{props.title}</p>
          <button>{props.text}</button>
        </div>
      );
    };

then export then Button. This reduce many lines of duplicate code. You
can then add the personalized button with title and text

    <Button text="" title="" />

## UI

Of course coding everything is too much, and there are lots of UI
libraries, like React-Bootstrap. Install the library from npm, then you
can use the components by changing it a little bit.

For example, a navbar in React-Bootstrap

        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

Then return the navbar and export to index js. There are also many other
components in React-Bootstrap like Button or Breadcrumbs. The main
reason I use the libraries are I don\'t want to code css.

## Axios

Use axios to communicate with the backend.

For example

    var x
    axios.get("https://ipapi.co/json").then(res=>{x=res.data})

This is a sample code of get request. Also, since the request is JSON,
it is useful to JSON.stringify the request, or refer to it by index. I
am only interested in getting the data from the server. There may be
lots of error in the get request, so it is best to add

    .catch(error=>{console.log(error)}

A Post request looks like

    axios.post("https://localhost:5000", {
        item1: value1
        item2: value2
    //more items
    });

This is used to make a post request, which will later put data into
database.

So after launching the backend you can use the axios to communicate with
the other port on localhost.

As you can see, it is much easier with the constructed tags than to
build one on my own, and also you can change by specifying style css,
then exporting it.

Basically create a header, a footer, render the pages with header and
footer separately(so you can see it on every page), then on every page
either it is static html, or you can perform get requests on other
websites(backend localhost) and add it on the page.

## Mongodb

Why need the backend? Because like in a social media page there is
constantly changing data. I personlly don\'t think you need a backend
for a personal homepage, but anyways, I just want to see how it works.

I used Mongodb in the application, and by signing up on mongodb and
clicking connect, and it will create default database

    const uri = "mongodb+srv://<username>:<password>@cluster0.h0cn5vv.mongodb.net/?retryWrites=true&w=majority";

add a uri in the code and connect it by replacing the username and
password.

### Mongoose

Mongoose is the javascript library to interact with Mongodb server from
the code.

### Schema

The first thing is to define schemas. For example

    const someSchema = new Schema(
      {
        username: {
          type: String,
          default: "",
        }
        password: {
          type: String,
          default: "",
        }

      }
    );

defines a user, then make a mongoose Model, and then you can export the
file to the main node file.

## Express

Use express to interact between visiting the webpage and the database.

    router.route("/post").post((req, res) => {}

defines a post method, then we create a new schema and add to the server

In Get requests we can use find() or sort() methods

You can store the data as JSON and send to the database, and also view
and change the database by logging in mongodb and browse collections.

Use axios to interact with the backend and mongoose to connect the
backend with the database, and then the site is live.

### Postman APIs

Download a post API to test the code to debug. By sending a get request
or post request to the url, then checking the database.

## Site is live

After adding cors to the code you can easily create a web application
with frontend and backend on different ports in the localhost.

At this point you should be able to access the website on the network by
typing in the computer ip address and the ports.

For example, if it is hosted on localhost:3000, then go to :3000 to see
the website

## Deploy to Linux

However, you can\'t run everything on your own computer because it
depends on Internet connection and your computer may shut off, so by
buying a Linux on the cloud and runnning the server on the cloud server,
you can then deploy the web application.

This seems easy, but it is the most time-consuming thing of all, and
took me many hours in sleepless nights to finish.

Buy a server in Linode(or AWS or whatever), then ssh into the server
with shell, then install the node and npm, then git clone the
repository, then run it.

There are several problems:

1 The sudo default installed node is v12, which is really old, and some
applications require more than v12

2 There may be bugs in the environment, and debugging is hard with
command line

Basically, I just couldn\'t run the nodejs in the cloud server, and as a
noob I want to have a GUI in the cloud server, which makes it look
better than the command line.

But GUI is very hard to install, and although in my own computer I
installed lightdm and ubuntu-desktop easily. When I tried to install
xfce, there are some driver problems.

Then I tried tigervnc-standalone-server, and tried connecting using
Remmina and VNC viewer, and it always refuse to connect. But when
connecting with

    ssh -L 5901:127.0.0.1:5901 user@example.com

it works.

Then I finally managed to add a vnc hostname and connect to the server
with VNC viewer by adding another Linode, and then there was no browser.

Then I installed firefox with snap but keyboard doesn\'t work in firefox
(I don\'t know why), then I tried to install google-chrome but it
wouldn\'t open(because I need to change the xhost display settings with
root and then open it as user), then I installed Palemoon and it worked
fine. I tried to install node v18 and it failed, and then I installed
node v20 and it succeeded.

Then I deployed the code to [the server](http://45.79.98.144:3000), but
it wouldn\'t connect when I used the chrome vpn extension to connect to
China(firewall), although it works fine when connecting to other
countries like Russia and Netherlands.

## Conclusion

There are many things to learn in Web Application, but most of them are
very simple. I spend many days debugging because of lack of experience
and hope to code better in the future.


## References

- [CSS](https://www.w3schools.com/css/)
- [JavaScript Tutorial](https://www.w3schools.com/js/)
- [jQuery](https://www.w3schools.com/jquery/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Router Documentation](https://reactrouter.com/web/guides/quick-start)
- [React-Bootstrap](https://react-bootstrap.netlify.app/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Express Tutorial (Web-dev Simplified)](https://www.youtube.com/watch?v=SccSCuHhOw0&ab_channel=WebDevSimplified)
- [MERN Stack Tutorial (freeCodeCamp)](https://www.youtube.com/watch?v=7CqJlxBYj-M&t=4373s&ab_channel=freeCodeCamp.org)
- [Decal Website](https://fullstackdecal.com/docs/Lessons/Lesson3)
- [Another Decal Website](https://www.cubstart.com/#/schedule)
- [Decal Videos](https://www.youtube.com/@webdevatberkeley7546)
- [Deploy to Linux YouTube Video](https://www.youtube.com/watch?v=oHAQ3TzUTro&ab_channel=SamMeech-Ward)
- [Remote Desktop GUI](https://www.linode.com/docs/guides/install-vnc-on-ubuntu-20-04/)
- [Stack Overflow](https://stackoverflow.com)