const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//app config
mongoose.connect('mongodb://localhost/blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose/model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Test',
//   image: 'https://placekitten.com/300/300',
//   body: 'Hello this is a blog post'
// });

//RESTful routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
})

//index route
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);

    } else {
      res.render('index', {blogs});

    }
  })
})

//new route
app.get('/blogs/new', (req, res) => {
  res.render('new');
})

//create route
app.post('/blogs', (req, res) => {
  //create blog
  Blog.create(req.body.blog, (err, newBlog) => {
    if(err) {
      res.render('new');
    } else {
      //redirect to index
      res.redirect('/blogs');
    }
  })
})

app.listen(3000, () => {
  console.log('listening!');
  
})