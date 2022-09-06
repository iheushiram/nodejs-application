const  express = require('express');
const { PrismaClient } = require('@prisma/client');

var router = express.Router();

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/:userid', async function(req, res, next) {
  const userId = req.params.userid;
  const sessionId = req.session.passport.user;
  const isAuth = Boolean(sessionId);
  const selectedPosts = await prisma.post.findMany({
    where: {
      authorId:  parseInt(userId),
    },
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
  res.render('user', { 
    title: 'Express',
    sessionId: sessionId,
    isAuth: isAuth,
    contents: selectedPosts,
    
  });
});

module.exports = router;
