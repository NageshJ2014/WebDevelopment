import express from "express";
import fs from "fs"
import bodyParser from "body-parser";
import { randomUUID } from "crypto";

import {dirname} from "path"
import {fileURLToPath} from "url"
const app = express();
const port = 3000;

console.log(randomUUID())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

var blogs = [
  {"title" : "NJ-Blog1","body" : "THis is First Blog 1", "id" : '200'},
  {"title" : "NJ-Blog2","body" : "THis is First Blog 2", "id" : '201'},
  {"title" : "NJ-Blog3","body" : "THis is First Blog 3 this is going to", "id" : '202'},
  {"title" : "NJ-Blog4","body" : "THis is First Blog 4", "id" : '203'}
]

function delete_id(id) {
  console.log("Came into Function with Id" + id )
  console.log(typeof(id))
  let found=0
  for(let i=0; i<blogs.length ; i++) {
    console.log(`ID In the Loop with Index ${i} = ${blogs[i]['id']}`)
    if (blogs[i]['id'] === id ) {
      console.log("CAME INSIDE IF MATCHING CONDITION")
       blogs.splice(i,1)
       found=1;
       break;
    }
  }
  if ( ! found) console.log("Cound Find the Blog with Id " + id)
}

function BlogObj (title, id, blog) {
this.title = title;
this.body = blog;
this.id = id;
}

app.get("/", (req,res) => {
  console.log("Hit the Root Page")
  res.render('index.ejs')
})

app.get("/about", (req,res) => {
  res.render('about.ejs')
})

app.get("/blogs", (req,res) => {
  console.log("Value of Blogs = " + blogs)
  res.render("Blogs.ejs",  {blogs : blogs})
})
app.get("/contact", (req,res) => {
  res.render('contact.ejs')
});

app.post("/delete/:id", (req,res) => {
  console.log(`Request Id Passed from Delete Button is ${req.params.id}`)
  // delete_id(parseInt(req.params.id));
  delete_id(req.params.id);
  res.redirect("/blogs")
});

app.post("/addblog" , (req,res) => {
  console.log(`Title Passed = ${req.body.title}`);
  console.log(`Blog Passed = ${req.body.blog}`);
let id = (Math.floor(Math.random() * 100000000));
// var blog = new BlogObj (req.body.title,id,req.body.blog);
var blog = new BlogObj (req.body.title,randomUUID(),req.body.blog);
console.log(blog)
blogs.push(blog);
res.redirect("/blogs")

})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
