require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const checkForAuthenticationCookie = require('./middlewares/authentication');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to database'))
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('Token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render('home', { user: req.user, blogs: allBlogs });
});

// Option 1: Keep '/blog' prefix, so blogRouter should NOT repeat '/blog'
app.use('/blog', blogRouter);

app.use('/user', userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
