const  express = require('express');
const { PrismaClient } = require('@prisma/client');

var router = express.Router();

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await prisma.user.findMany();
  res.end()
});

module.exports = router;
