const  express = require('express');
const  router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const users = await prisma.user.findMany();

  res.render('signup', { 
    title: 'Express',
  });
});

router.post('/', async (req, res, next) => {
    const name = await req.body.name;
    const email = await req.body.email;
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        },
    });
    
    res.redirect('/signin');
})

module.exports = router;
