const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Get all posts - homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ 
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          // include: {
          //   model: User,
          //   attributes: ['username']
          // }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map(post => post.get({ plain: true }));

    console.log(posts);

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all posts - dashboard
router.get('/dashboard', async (req, res) => {
  if (req.session.loggedIn) {

    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'title',
          'content',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            // include: {
            //   model: User,
            //   attributes: ['username']
            // }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });

      const posts = postData.map(post => post.get({ plain: true }));

      res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else{
    res.redirect('/login');
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
