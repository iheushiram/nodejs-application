const  express = require('express');
const  router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();
  const sessionId = req.session.passport.user || undefined;
  const isAuth = Boolean(sessionId);
  const selectedPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
    orderBy: [{
      created_at: 'desc'
    }]
  });

  res.render('index', { 
    title: 'Express',
    sessionId: sessionId,
    users: users ,
    posts: posts,
    isAuth: isAuth,
    contents: selectedPosts,
    
  });
});


router.post('/delete', async (req, res, next) => {
  const contentId = req.body.contentId;
  const deletedContent = await prisma.post.delete({
    where: {
      id: parseInt(contentId),
    }
  });

  res.redirect('/');
});

module.exports = router;
