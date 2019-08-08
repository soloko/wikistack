const express = require('express');
const { Page } = require('../models/index')
const { User } = require('../models/index')
const index = require('../views/index.js');
const layout = require('../views/layout')
Page.beforeValidate((instance) => {
  instance.slug = instance.title.split(' ').join('_').replace(/[^\w]/g, '');
})

let router = express.Router();

router.get('/', (req, res, next) => {
  res.send(index.main());
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: 'open',
  })
  const user = new User({
    name: req.body.name,
    email: req.body.email
  })
  try {
    await page.save();
    await user.save();
    res.redirect(`${page.slug}`);
  } catch (err) {
     next(err);
  }

});


router.get('/add', (req, res, next) => {
  res.send(index.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const pageContent = await Page.findOne({
      where: {slug: req.params.slug}
    })
    res.send(index.wikiPage(pageContent));
  } catch (err) {
    next(err);
  }
})

module.exports = router;
