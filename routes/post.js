const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', (req, res, next) => {
    res.render('post');
});

router.post('/', async (req, res, next) => {
    const content = await req.body['post-content'];
    const userId = req.session.passport.user;
    const postedContent = await prisma.post.create({
        data: {
            title: 'posted content',
            authorId: userId,
            content: content,
        }
    });
    res.redirect('/');
})
module.exports = router;